import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Check, Star, Zap, Calendar, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PaymentModal } from "@/components/PaymentModal";
import { useState } from "react";

const features = [
  {
    icon: Calendar,
    title: "Advanced Meal Planning",
    description: "Plan meals up to 4 weeks in advance with smart suggestions"
  },
  {
    icon: BookOpen,
    title: "Premium Recipe Collection", 
    description: "Access to 500+ exclusive recipes from professional chefs"
  },
  {
    icon: Zap,
    title: "Smart Grocery Lists",
    description: "Auto-generated shopping lists with local store integration"
  },
  {
    icon: Star,
    title: "Nutritional Analysis",
    description: "Detailed nutrition tracking and personalized recommendations"
  }
];

const Premium = () => {
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    checkoutUrl: '',
    planName: ''
  });
  const handlePayment = async (planType: 'premium' | 'family') => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert('Please sign in to upgrade your plan');
        return;
      }

      // Show loading state
      const planDetails = {
        premium: { name: 'Premium Plan' },
        family: { name: 'Family Plan' }
      };

      setPaymentModal({
        isOpen: true,
        checkoutUrl: '',
        planName: planDetails[planType].name
      });

      const response = await supabase.functions.invoke('intasend-payments', {
        body: { 
          planType,
          userEmail: session.user.email 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (response.error) {
        console.error('Payment error:', response.error);
        setPaymentModal(prev => ({ ...prev, isOpen: false }));
        alert('Payment failed. Please try again.');
        return;
      }

      const { checkout_url } = response.data;
      
      // Update modal with checkout URL
      setPaymentModal(prev => ({
        ...prev,
        checkoutUrl: checkout_url
      }));
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentModal(prev => ({ ...prev, isOpen: false }));
      alert('Payment failed. Please try again.');
    }
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      checkoutUrl: '',
      planName: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="w-20 h-20 gradient-premium rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
          <Crown className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Unlock Premium Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Take your meal planning to the next level with our premium subscription
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Free Plan */}
        <Card className="p-6 relative">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Free Plan</h3>
            <div className="text-3xl font-bold">$0</div>
            <div className="text-muted-foreground">per month</div>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Basic meal planning</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">50 free recipes</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Weekly meal suggestions</span>
            </li>
          </ul>
          
          <Button variant="outline" className="w-full">Current Plan</Button>
        </Card>

        {/* Premium Plan */}
        <Card className="p-6 relative border-2 border-primary shadow-warm">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="gradient-premium text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2 text-primary">Premium Plan</h3>
            <div className="text-4xl font-bold">$9.99</div>
            <div className="text-muted-foreground">per month</div>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Everything in Free</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">500+ premium recipes</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Advanced meal planning</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Smart grocery lists</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Nutritional analysis</span>
            </li>
          </ul>
          
          <Button 
            variant="hero" 
            className="w-full shadow-glow" 
            onClick={() => handlePayment('premium')}
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </Card>

        {/* Family Plan */}
        <Card className="p-6 relative">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Family Plan</h3>
            <div className="text-3xl font-bold">$19.99</div>
            <div className="text-muted-foreground">per month</div>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Everything in Premium</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Up to 6 family members</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Family meal coordination</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-success mr-2" />
              <span className="text-sm">Bulk grocery planning</span>
            </li>
          </ul>
          
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={() => handlePayment('family')}
          >
            Choose Family
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-elevated transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-premium rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-8 text-center gradient-hero text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Meal Planning?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Join thousands of food lovers who have upgraded their cooking game with DecentFoodie Premium
        </p>
        <Button 
          variant="secondary" 
          size="lg" 
          className="bg-white/20 hover:bg-white/30 text-white border-0"
          onClick={() => handlePayment('premium')}
        >
          Start Your Premium Journey
        </Button>
      </Card>

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        checkoutUrl={paymentModal.checkoutUrl}
        planName={paymentModal.planName}
      />
    </div>
  );
};

export default Premium;