-- Update payments table for subscription support
ALTER TABLE public.payments 
ADD COLUMN subscription_type text,
ADD COLUMN intasend_invoice_id text,
ADD COLUMN intasend_customer_id text,
ADD COLUMN subscription_status text DEFAULT 'active',
ADD COLUMN next_billing_date timestamp with time zone;

-- Add index for faster lookups
CREATE INDEX idx_payments_user_subscription ON public.payments(user_id, subscription_status);
CREATE INDEX idx_payments_intasend_invoice ON public.payments(intasend_invoice_id);