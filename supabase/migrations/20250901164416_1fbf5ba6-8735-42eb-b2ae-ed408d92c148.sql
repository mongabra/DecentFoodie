-- Fix critical security vulnerabilities by enabling RLS and creating proper policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table - most restrictive
-- Users can only see their own profile, not other users' emails
CREATE POLICY "Users can view their own profile only" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile only" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id);

-- Create RLS policies for payments table - users can only see their own payments
CREATE POLICY "Users can view their own payments only" 
ON public.payments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments only" 
ON public.payments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for meals table - protect premium content
CREATE POLICY "Users can view free meals" 
ON public.meals 
FOR SELECT 
USING (is_premium = false);

CREATE POLICY "Authenticated users can view premium meals" 
ON public.meals 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_premium = true);

-- Create RLS policies for recipes table - linked to meal access
CREATE POLICY "Users can view recipes for accessible meals" 
ON public.recipes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.meals 
    WHERE meals.id = recipes.meal_id 
    AND (
      meals.is_premium = false 
      OR (meals.is_premium = true AND auth.uid() IS NOT NULL)
    )
  )
);