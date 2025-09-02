import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Heart } from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Mandazi with Chai",
    description: "Sweet fried dough served with spiced tea",
    prepTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "2 cups all-purpose flour",
      "1/2 cup coconut milk",
      "2 tbsp sugar",
      "1 tsp cardamom",
      "Oil for frying",
      "Tea leaves and spices"
    ],
    instructions: [
      "Mix flour, sugar, and cardamom",
      "Add coconut milk to form dough", 
      "Roll and cut into triangles",
      "Deep fry until golden brown",
      "Prepare spiced tea with cardamom and ginger",
      "Serve mandazi warm with chai"
    ],
    isPremium: false
  },
  {
    id: 2,
    title: "Jollof Rice with Plantain", 
    description: "West African spiced rice with sweet fried plantains",
    prepTime: "40 min",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "2 cups jasmine rice",
      "400g tomato paste",
      "2 ripe plantains",
      "1 onion, diced",
      "2 bay leaves",
      "Palm oil",
      "Scotch bonnet pepper"
    ],
    instructions: [
      "Sauté onions in palm oil until golden",
      "Add tomato paste and spices",
      "Add rice and stock, bring to boil",
      "Simmer covered for 20 minutes",
      "Fry plantains until caramelized",
      "Serve jollof rice with fried plantains"
    ],
    isPremium: false
  },
  {
    id: 3,
    title: "Ethiopian Doro Wat",
    description: "Premium spiced chicken stew with injera bread",
    prepTime: "90 min", 
    servings: 6,
    difficulty: "Advanced",
    ingredients: [
      "Whole chicken pieces",
      "Berbere spice blend",
      "Red onions",
      "Injera bread",
      "Hard-boiled eggs",
      "Ethiopian butter (niter kibbeh)"
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