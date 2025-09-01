import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Heart } from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Avocado Toast Bowl",
    description: "Fresh avocado on sourdough with poached egg and cherry tomatoes",
    prepTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "2 eggs",
      "1 cup cherry tomatoes",
      "Salt and pepper to taste",
      "Olive oil"
    ],
    instructions: [
      "Toast the sourdough bread until golden brown",
      "Mash the avocado with salt and pepper", 
      "Poach the eggs in simmering water",
      "Halve the cherry tomatoes",
      "Spread avocado on toast, top with egg and tomatoes",
      "Drizzle with olive oil and serve"
    ],
    isPremium: false
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Salad", 
    description: "Protein-packed quinoa with fresh vegetables and feta cheese",
    prepTime: "25 min",
    servings: 3,
    difficulty: "Medium",
    ingredients: [
      "1 cup quinoa",
      "1 cucumber, diced",
      "1 cup cherry tomatoes",
      "100g feta cheese",
      "1/4 red onion",
      "2 tbsp olive oil",
      "1 lemon, juiced"
    ],
    instructions: [
      "Cook quinoa according to package directions",
      "Let quinoa cool completely",
      "Dice cucumber, tomatoes, and onion",
      "Crumble feta cheese",
      "Mix all ingredients with olive oil and lemon",
      "Season with salt and pepper"
    ],
    isPremium: false
  },
  {
    id: 3,
    title: "Herb-Crusted Salmon",
    description: "Premium wild salmon with fresh herbs and lemon",
    prepTime: "35 min", 
    servings: 2,
    difficulty: "Advanced",
    ingredients: [
      "2 salmon fillets",
      "Mixed fresh herbs",
      "Breadcrumbs",
      "Lemon zest",
      "Garlic",
      "Olive oil"
    ],
    instructions: [
      "This is a premium recipe",
      "Upgrade to unlock full instructions"
    ],
    isPremium: true
  }
];

const Recipes = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recipe Collection</h1>
        <p className="text-muted-foreground">
          Discover delicious recipes with step-by-step instructions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{recipe.title}</h3>
                <Button variant="ghost" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-muted-foreground">{recipe.description}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChefHat className="w-4 h-4" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Instructions</h4>
                <ol className="space-y-2">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex">
                      <span className="w-5 h-5 bg-primary/10 text-primary rounded-full text-xs flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              {recipe.isPremium && (
                <div className="mt-4 p-4 gradient-premium rounded-lg text-white">
                  <p className="text-sm">🔒 This is a premium recipe</p>
                  <Button variant="secondary" size="sm" className="mt-2 bg-white/20 hover:bg-white/30 text-white border-0">
                    Unlock Premium
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Recipes;