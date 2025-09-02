/*
  # Update meals with African dishes

  1. Changes
    - Replace existing meals with balanced African dishes
    - Keep breakfast items as international options
    - Focus on lunch and supper with authentic African cuisine
    - Maintain premium/free structure

  2. New African Dishes
    - Jollof Rice variations
    - Ugali with traditional sides
    - Ethiopian dishes (Doro Wat, Injera)
    - South African specialties (Bobotie, Braai)
    - West African staples (Fufu, Egusi)
    - North African cuisine (Tagine, Couscous)

  3. Nutritional Balance
    - Protein sources: Fish, chicken, beef, legumes
    - Carbohydrates: Rice, ugali, injera, couscous
    - Vegetables: Traditional African greens and vegetables
*/

-- Update existing meals with African dishes
UPDATE public.meals SET 
  title = CASE 
    WHEN day = 'monday' AND meal_type = 'lunch' THEN 'Jollof Rice with Grilled Tilapia'
    WHEN day = 'monday' AND meal_type = 'supper' THEN 'Ugali with Sukuma Wiki & Nyama Choma'
    WHEN day = 'tuesday' AND meal_type = 'lunch' THEN 'Thieboudienne (Senegalese Fish Rice)'
    WHEN day = 'tuesday' AND meal_type = 'supper' THEN 'Injera with Doro Wat'
    WHEN day = 'wednesday' AND meal_type = 'lunch' THEN 'Fufu with Egusi Soup'
    WHEN day = 'wednesday' AND meal_type = 'supper' THEN 'Bobotie with Yellow Rice'
    WHEN day = 'thursday' AND meal_type = 'lunch' THEN 'Moroccan Couscous with Vegetables'
    WHEN day = 'thursday' AND meal_type = 'supper' THEN 'South African Braai Platter'
    WHEN day = 'friday' AND meal_type = 'lunch' THEN 'Bunny Chow (Curry in Bread)'
    WHEN day = 'friday' AND meal_type = 'supper' THEN 'Nigerian Pepper Soup with Pounded Yam'
    WHEN day = 'saturday' AND meal_type = 'lunch' THEN 'Biltong and Pap with Morogo'
    WHEN day = 'saturday' AND meal_type = 'supper' THEN 'Moroccan Lamb Tagine with Flatbread'
    WHEN day = 'sunday' AND meal_type = 'lunch' THEN 'Chapati with Githeri'
    WHEN day = 'sunday' AND meal_type = 'supper' THEN 'Berbere Spiced Beef with Injera'
    ELSE title
  END
WHERE meal_type IN ('lunch', 'supper');

-- Update recipes with African dish instructions
UPDATE public.recipes SET 
  ingredients = CASE 
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Jollof Rice with Grilled Tilapia') 
    THEN ARRAY['2 cups jasmine rice', '400g fresh tilapia', '3 tomatoes', '1 onion', '2 bay leaves', 'Palm oil', 'Scotch bonnet pepper', 'Ginger', 'Garlic', 'Thyme']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Ugali with Sukuma Wiki & Nyama Choma') 
    THEN ARRAY['2 cups white cornmeal', '500g beef/goat meat', '1 bunch collard greens', '2 tomatoes', '1 onion', 'Cooking oil', 'Salt', 'Royco cubes']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Thieboudienne (Senegalese Fish Rice)') 
    THEN ARRAY['2 cups broken rice', '500g fish fillets', '2 eggplants', '1 cabbage', '2 carrots', 'Tomato paste', 'Tamarind', 'Scotch bonnet', 'Onions']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Injera with Doro Wat') 
    THEN ARRAY['Injera bread', '1 whole chicken', 'Berbere spice', '6 hard-boiled eggs', 'Red onions', 'Garlic', 'Ginger', 'Ethiopian butter']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Fufu with Egusi Soup') 
    THEN ARRAY['Cassava flour', '500g beef/fish', '2 cups ground melon seeds', 'Spinach', 'Palm oil', 'Stockfish', 'Crayfish', 'Seasoning cubes']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Bobotie with Yellow Rice') 
    THEN ARRAY['500g ground beef', '2 slices bread', '1 onion', 'Curry powder', 'Turmeric', '2 eggs', 'Milk', 'Basmati rice', 'Raisins']
    
    ELSE ingredients
  END,
  instructions = CASE 
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Jollof Rice with Grilled Tilapia') 
    THEN ARRAY['Season and grill tilapia with herbs', 'Blend tomatoes, onions, and peppers', 'Fry rice in palm oil', 'Add tomato base and spices', 'Add stock and simmer 25 minutes', 'Serve with grilled fish']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Ugali with Sukuma Wiki & Nyama Choma') 
    THEN ARRAY['Grill meat with salt and spices', 'Boil water for ugali', 'Gradually add cornmeal while stirring', 'Cook sukuma wiki with onions and tomatoes', 'Form ugali into portions', 'Serve together with meat']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Thieboudienne (Senegalese Fish Rice)') 
    THEN ARRAY['Stuff fish with herbs and vegetables', 'Brown fish in oil', 'Cook vegetables in same pot', 'Add rice and tomato base', 'Simmer with tamarind water', 'Serve fish over rice with vegetables']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Injera with Doro Wat') 
    THEN ARRAY['Marinate chicken in berbere spice', 'Caramelize onions slowly', 'Add chicken and spices', 'Simmer with hard-boiled eggs', 'Cook until tender', 'Serve on injera bread']
    
    WHEN EXISTS (SELECT 1 FROM public.meals WHERE meals.id = recipes.meal_id AND meals.title = 'Fufu with Egusi Soup') 
    THEN ARRAY['Pound cassava into smooth fufu', 'Brown meat and stockfish', 'Blend melon seeds with peppers', 'Cook egusi base with palm oil', 'Add spinach and seasonings', 'Serve fufu with soup']
    
    ELSE instructions
  END
WHERE EXISTS (
  SELECT 1 FROM public.meals 
  WHERE meals.id = recipes.meal_id 
  AND meals.meal_type IN ('lunch', 'supper')
);