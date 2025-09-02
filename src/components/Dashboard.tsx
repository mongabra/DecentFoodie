import { MealCard } from "@/components/MealCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingUp, Clock, Calendar } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";
import { PaymentModal } from "@/components/PaymentModal";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const todaysMeals = [
  {
    type: "breakfast" as const,
    title: "Avocado Toast Bowl",
    description: "Fresh avocado on sourdough with poached egg",
    prepTime: "15 min",
    servings: 2,
    isPremium: false
  },
  {
    type: "lunch" as const,
    title: "Jollof Rice with Grilled Tilapia",
    description: "Spiced rice with fresh fish and mixed vegetables",
    prepTime: "45 min", 
    servings: 4,
    isPremium: false
  },
  {
    type: "supper" as const,
    title: "Ugali with Sukuma Wiki & Nyama Choma",
    description: "Traditional cornmeal with collard greens and grilled meat",
    prepTime: "50 min",
    servings: 4,
    isPremium: true,
    isLocked: true
  }
];

export const Dashboard = () => {
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={heroFood} 
          alt="Delicious meals and fresh ingredients" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to DecentFoodie
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                Your personalized meal planning companion
              </p>
              <Button variant="hero" size="lg" className="shadow-glow">
                <Calendar className="w-5 h-5 mr-2" />
                View Weekly Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center hover:shadow-elevated transition-smooth">
            <div className="w-12 h-12 gradient-breakfast rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              📊
            </div>
            <h3 className="font-semibold text-lg mb-2">Weekly Progress</h3>
            <p className="text-2xl font-bold text-primary">5/7</p>
            <p className="text-muted-foreground text-sm">Meals completed</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-elevated transition-smooth">
            <div className="w-12 h-12 gradient-lunch rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              ⏱️
            </div>
            <h3 className="font-semibold text-lg mb-2">Avg Prep Time</h3>
            <p className="text-2xl font-bold text-success">25 min</p>
            <p className="text-muted-foreground text-sm">Per meal</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-elevated transition-smooth">
            <div className="w-12 h-12 gradient-premium rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              👑
            </div>
            <h3 className="font-semibold text-lg mb-2">Premium Access</h3>
            <p className="text-2xl font-bold text-warning">Locked</p>
            <p className="text-muted-foreground text-sm">Upgrade to unlock</p>
          </Card>
        </div>

        {/* Today's Meals */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <CalendarDays className="w-6 h-6 mr-2 text-primary" />
              Today's Meals
            </h2>
            <Button variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {todaysMeals.map((meal, index) => (
              <MealCard
                key={index}
                type={meal.type}
                title={meal.title}
                description={meal.description}
                prepTime={meal.prepTime}
                servings={meal.servings}
                isPremium={meal.isPremium}
                isLocked={meal.isLocked}
                onClick={() => console.log(`Clicked ${meal.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 gradient-hero text-white">
            <h3 className="text-xl font-bold mb-2">🗓️ Plan Your Week</h3>
            <p className="text-white/90 mb-4">
              Get personalized meal recommendations for the entire week
            </p>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
              Start Planning
            </Button>
          </Card>
          
          <Card className="p-6 gradient-premium text-white">
            <h3 className="text-xl font-bold mb-2">👑 Unlock Premium</h3>
            <p className="text-white/90 mb-4">
              Access exclusive recipes and advanced meal planning features
            </p>
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => handlePayment('premium')}
            >
              Upgrade Now
            </Button>
          </Card>
        </div>

        <PaymentModal
          isOpen={paymentModal.isOpen}
          onClose={closePaymentModal}
          checkoutUrl={paymentModal.checkoutUrl}
          planName={paymentModal.planName}
        />
      </div>
    </div>
  );
};