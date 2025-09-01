import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/MealCard";
import { Lock, Crown } from "lucide-react";

const weeklyMeals = {
  Monday: {
    breakfast: { title: "Oatmeal Bowl", isPremium: false, isLocked: false },
    lunch: { title: "Caesar Salad", isPremium: false, isLocked: false },
    supper: { title: "Grilled Chicken", isPremium: true, isLocked: true }
  },
  Tuesday: {
    breakfast: { title: "Greek Yogurt", isPremium: false, isLocked: false },
    lunch: { title: "Quinoa Bowl", isPremium: true, isLocked: true },
    supper: { title: "Fish Tacos", isPremium: false, isLocked: false }
  },
  Wednesday: {
    breakfast: { title: "Smoothie Bowl", isPremium: true, isLocked: true },
    lunch: { title: "Veggie Wrap", isPremium: false, isLocked: false },
    supper: { title: "Pasta Primavera", isPremium: false, isLocked: false }
  },
  Thursday: {
    breakfast: { title: "Avocado Toast", isPremium: false, isLocked: false },
    lunch: { title: "Buddha Bowl", isPremium: true, isLocked: true },
    supper: { title: "Stir Fry", isPremium: false, isLocked: false }
  },
  Friday: {
    breakfast: { title: "Pancakes", isPremium: true, isLocked: true },
    lunch: { title: "Soup & Salad", isPremium: false, isLocked: false },
    supper: { title: "Pizza Night", isPremium: false, isLocked: false }
  },
  Saturday: {
    breakfast: { title: "French Toast", isPremium: true, isLocked: true },
    lunch: { title: "Sushi Bowl", isPremium: true, isLocked: true },
    supper: { title: "BBQ Ribs", isPremium: true, isLocked: true }
  },
  Sunday: {
    breakfast: { title: "Brunch Spread", isPremium: true, isLocked: true },
    lunch: { title: "Light Salad", isPremium: false, isLocked: false },
    supper: { title: "Roast Dinner", isPremium: true, isLocked: true }
  }
};

const Weekly = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Weekly Meal Plan</h1>
        <p className="text-muted-foreground">
          Plan your entire week with our curated meal suggestions
        </p>
      </div>

      <div className="mb-6">
        <Card className="p-4 gradient-premium text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1 flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                Premium Weekly Plans
              </h3>
              <p className="text-white/80 text-sm">
                Unlock premium meals to access all weekly meal plans
              </p>
            </div>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
              Upgrade Now
            </Button>
          </div>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-4 min-w-[900px]">
          {/* Header */}
          <div className="text-center font-semibold text-muted-foreground">
            Day / Meal
          </div>
          <div className="text-center font-semibold">Breakfast</div>
          <div className="text-center font-semibold">Lunch</div>
          <div className="text-center font-semibold">Supper</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>

          {/* Days */}
          {Object.entries(weeklyMeals).map(([day, meals]) => (
            <>
              <div key={`${day}-label`} className="font-semibold text-foreground py-4">
                {day}
              </div>
              <Card key={`${day}-breakfast`} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{meals.breakfast.title}</span>
                  {meals.breakfast.isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Card>
              <Card key={`${day}-lunch`} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{meals.lunch.title}</span>
                  {meals.lunch.isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Card>
              <Card key={`${day}-supper`} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{meals.supper.title}</span>
                  {meals.supper.isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Card>
              <div key={`${day}-spacer1`}></div>
              <div key={`${day}-spacer2`}></div>
              <div key={`${day}-spacer3`}></div>
              <div key={`${day}-spacer4`}></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weekly;