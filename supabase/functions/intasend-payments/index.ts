import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  planType: 'premium' | 'family';
  userEmail: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    if (req.method === 'POST') {
      const { planType }: PaymentRequest = await req.json();
      
      // Plan details
      const planDetails = {
        premium: { amount: 9.99, name: 'Premium Plan' },
        family: { amount: 19.99, name: 'Family Plan' }
      };

      const plan = planDetails[planType];
      if (!plan) {
        throw new Error('Invalid plan type');
      }

      // Create IntaSend invoice
      const intasendResponse = await fetch('https://payment.intasend.com/api/v1/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-IntaSend-Public-Key-Test': Deno.env.get('INTASEND_PUBLISHABLE_KEY') ?? '',
          'Authorization': `Bearer ${Deno.env.get('INTASEND_SECRET_KEY') ?? ''}`,
        },
        body: JSON.stringify({
          public_key: Deno.env.get('INTASEND_PUBLISHABLE_KEY'),
          amount: plan.amount,
          currency: 'USD',
          email: user.email,
          redirect_url: `${req.headers.get('origin')}/premium?payment=success`,
          api_ref: `${user.id}_${planType}_${Date.now()}`,
          method: ['CARD-PAYMENT', 'M-PESA'],
          comment: `${plan.name} Subscription`,
          extra: {
            subscription: true,
            billing_cycle: 'monthly',
            plan_type: planType
          }
        })
      });

      if (!intasendResponse.ok) {
        const errorText = await intasendResponse.text();
        console.error('IntaSend API error:', errorText);
        throw new Error(`IntaSend API error: ${intasendResponse.status}`);
      }

      const intasendData = await intasendResponse.json();
      console.log('IntaSend response:', intasendData);

      // Store payment record in database
      const { error: dbError } = await supabaseClient
        .from('payments')
        .insert({
          user_id: user.id,
          amount: plan.amount,
          subscription_type: planType,
          intasend_invoice_id: intasendData.invoice.invoice_id,
          intasend_customer_id: intasendData.invoice.customer?.id,
          status: 'pending',
          subscription_status: 'pending',
          next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save payment record');
      }

      return new Response(
        JSON.stringify({
          success: true,
          checkout_url: intasendData.url,
          invoice_id: intasendData.invoice.invoice_id
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Handle webhook (IntaSend payment notifications)
    if (req.method === 'PUT') {
      const webhookData = await req.json();
      console.log('IntaSend webhook received:', webhookData);

      // Verify webhook authenticity (optional but recommended)
      const signature = req.headers.get('x-intasend-signature');
      
      // Update payment status based on webhook
      const { error: updateError } = await supabaseClient
        .from('payments')
        .update({
          status: webhookData.state === 'COMPLETE' ? 'completed' : 'failed',
          subscription_status: webhookData.state === 'COMPLETE' ? 'active' : 'cancelled'
        })
        .eq('intasend_invoice_id', webhookData.invoice_id);

      if (updateError) {
        console.error('Failed to update payment status:', updateError);
        throw new Error('Failed to update payment status');
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    );

  } catch (error) {
    console.error('Error in intasend-payments function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});