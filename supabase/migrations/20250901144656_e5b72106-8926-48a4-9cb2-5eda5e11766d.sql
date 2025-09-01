-- Create meals table
CREATE TABLE public.meals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day TEXT NOT NULL, -- 'monday', 'tuesday', etc.
  meal_type TEXT NOT NULL, -- 'breakfast', 'lunch', 'supper'
  title TEXT NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipes table
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_id UUID NOT NULL REFERENCES public.meals(id) ON DELETE CASCADE,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for additional user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  has_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for meals (publicly readable for demo purposes)
CREATE POLICY "Meals are viewable by everyone" 
ON public.meals 
FOR SELECT 
USING (true);

-- Create RLS policies for recipes (publicly readable for demo purposes)
CREATE POLICY "Recipes are viewable by everyone" 
ON public.recipes 
FOR SELECT 
USING (true);

-- Create RLS policies for payments (user-specific)
CREATE POLICY "Users can view their own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Create RLS policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_meals_updated_at
  BEFORE UPDATE ON public.meals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample meal data
INSERT INTO public.meals (day, meal_type, title, is_premium) VALUES
('monday', 'breakfast', 'Avocado Toast', false),
('monday', 'lunch', 'Grilled Chicken Salad', false),
('monday', 'supper', 'Premium Steak Dinner', true),
('tuesday', 'breakfast', 'Oatmeal Bowl', false),
('tuesday', 'lunch', 'Turkey Sandwich', false),
('tuesday', 'supper', 'Premium Salmon Fillet', true),
('wednesday', 'breakfast', 'Smoothie Bowl', false),
('wednesday', 'lunch', 'Caesar Salad', false),
('wednesday', 'supper', 'Premium Lobster Risotto', true),
('thursday', 'breakfast', 'Pancakes', false),
('thursday', 'lunch', 'Quinoa Bowl', false),
('thursday', 'supper', 'Premium Wagyu Beef', true),
('friday', 'breakfast', 'French Toast', false),
('friday', 'lunch', 'Pasta Salad', false),
('friday', 'supper', 'Premium Duck Confit', true),
('saturday', 'breakfast', 'Eggs Benedict', false),
('saturday', 'lunch', 'Fish Tacos', false),
('saturday', 'supper', 'Premium Tuna Tartare', true),
('sunday', 'breakfast', 'Breakfast Burrito', false),
('sunday', 'lunch', 'Greek Salad', false),
('sunday', 'supper', 'Premium Lamb Chops', true);

-- Insert sample recipe data
INSERT INTO public.recipes (meal_id, ingredients, instructions)
SELECT 
  m.id,
  CASE 
    WHEN m.title = 'Avocado Toast' THEN ARRAY['2 slices bread', '1 avocado', 'Salt', 'Pepper', 'Lime juice']
    WHEN m.title = 'Grilled Chicken Salad' THEN ARRAY['Chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil']
    WHEN m.title = 'Premium Steak Dinner' THEN ARRAY['Ribeye steak', 'Garlic', 'Butter', 'Rosemary', 'Red wine']
    ELSE ARRAY['Sample ingredient 1', 'Sample ingredient 2', 'Sample ingredient 3']
  END,
  CASE 
    WHEN m.title = 'Avocado Toast' THEN ARRAY['Toast bread', 'Mash avocado', 'Season with salt and pepper', 'Add lime juice', 'Serve immediately']
    WHEN m.title = 'Grilled Chicken Salad' THEN ARRAY['Grill chicken breast', 'Chop vegetables', 'Mix greens', 'Add dressing', 'Top with chicken']
    WHEN m.title = 'Premium Steak Dinner' THEN ARRAY['Season steak', 'Heat pan', 'Sear steak', 'Add butter and herbs', 'Rest before serving']
    ELSE ARRAY['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']
  END
FROM public.meals m;