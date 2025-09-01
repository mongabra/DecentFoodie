import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Lock, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MealCardProps {
  type: "breakfast" | "lunch" | "supper";
  title: string;
  description?: string;
  isPremium?: boolean;
  isLocked?: boolean;
  prepTime?: string;
  servings?: number;
  onClick?: () => void;
  className?: string;
}

const mealIcons = {
  breakfast: "🌅",
  lunch: "☀️", 
  supper: "🌙"
};

const mealGradients = {
  breakfast: "meal-card-breakfast",
  lunch: "meal-card-lunch", 
  supper: "meal-card-supper"
};

export const MealCard = ({
  type,
  title,
  description,
  isPremium = false,
  isLocked = false,
  prepTime = "30 min",
  servings = 2,
  onClick,
  className
}: MealCardProps) => {
  return (
    <Card 
      className={cn(
        "meal-card",
        isPremium && !isLocked ? "meal-card-premium" : mealGradients[type],
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{mealIcons[type]}</div>
        {isPremium && (
          <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
            <Crown className="w-3 h-3" />
            <span className="text-xs font-medium">Premium</span>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        {description && (
          <p className="text-white/80 text-sm">{description}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-white/80">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{prepTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{servings}</span>
          </div>
        </div>
        
        {isLocked ? (
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
            <Lock className="w-4 h-4 mr-1" />
            Unlock
          </Button>
        ) : (
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
            View Recipe
          </Button>
        )}
      </div>
    </Card>
  );
};