import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/MealCard";
import { Lock, Crown } from "lucide-react";
import React from "react";

const weeklyMeals = {
  Monday: {
    breakfast: { title: "Oatmeal Bowl", isPremium: false, isLocked: false },
    lunch: { title: "Jollof Rice & Fish", isPremium: false, isLocked: false },
    supper: { title: "Ugali & Sukuma Wiki", isPremium: true, isLocked: true }
  },
  Tuesday: {
    breakfast: { title: "Greek Yogurt", isPremium: false, isLocked: false },
    lunch: { title: "Thieboudienne", isPremium: true, isLocked: true },
    supper: { title: "Injera with Doro Wat", isPremium: false, isLocked: false }
  },
  Wednesday: {
    breakfast: { title: "Smoothie Bowl", isPremium: true, isLocked: true },
    lunch: { title: "Fufu with Egusi Soup", isPremium: false, isLocked: false },
    supper: { title: "Bobotie with Rice", isPremium: false, isLocked: false }
  },
  Thursday: {
    breakfast: { title: "Avocado Toast", isPremium: false, isLocked: false },
    lunch: { title: "Couscous with Tagine", isPremium: true, isLocked: true },
    supper: { title: "Braai Platter", isPremium: false, isLocked: false }
  },
  Friday: {
    breakfast: { title: "Pancakes", isPremium: true, isLocked: true },
    lunch: { title: "Bunny Chow", isPremium: false, isLocked: false },
    supper: { title: "Potjiekos Stew", isPremium: false, isLocked: false }
  },
  Saturday: {
    breakfast: { title: "French Toast", isPremium: true, isLocked: true },
    lunch: { title: "Biltong & Pap", isPremium: true, isLocked: true },
    supper: { title: "Moroccan Lamb Tagine", isPremium: true, isLocked: true }
  },
  Sunday: {
    breakfast: { title: "Brunch Spread", isPremium: true, isLocked: true },
    lunch: { title: "Chapati with Beans", isPremium: false, isLocked: false },
    supper: { title: "Berbere Spiced Beef", isPremium: true, isLocked: true }
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
            <React.Fragment key={day}>
              <div className="font-semibold text-foreground py-4">
                {day}
              </div>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{meals.breakfast.title}</span>
                  {meals.breakfast.isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{meals.lunch.title}</span>
                  {meals.lunch.isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{meals.supper.title}</span>
                  {meals.supper.isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </Card>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weekly;