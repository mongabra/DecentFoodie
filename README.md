🍽️ DecentFoodie

DecentFoodie is a simple meal-planning web app built for the Vibe-Coding Hackathon.
It helps users access daily and weekly meal timetables while promoting SDG 2 (Zero Hunger) by encouraging healthy, consistent eating habits.

Users can log in securely with Supabase Auth, view meals, and unlock premium weekly plans via IntaSend Payments.

🚀 Features

✅ User Authentication (Supabase)

✅ Meal Timetable (Breakfast, Lunch, Dinner)

✅ Payment Integration with IntaSend (unlock weekly plan)

✅ Deployed Frontend with Lovable

✅ Supabase Database for storing meals and users

🛠️ Tech Stack

Frontend: Lovable

Backend / Database: Supabase

Payments: IntaSend

Deployment: Bolt.new

📂 Database Schema (Supabase)
meals
Column	Type	Description
id	int	Primary key
name	text	Meal name
type	text	breakfast / lunch / dinner
day	text	e.g. Monday
users
Column	Type	Description
id	uuid	Supabase Auth user id
email	text	User email
created_at	timestamptz	Signup date
🔐 Authentication

Users sign up or log in using Supabase Auth.

After login, they can view meals directly linked to their account.

💳 Payments with IntaSend

Clicking “Unlock Weekly Plan” calls a Supabase Edge Function that initializes IntaSend Checkout.

The user is redirected to IntaSend for payment.

After successful payment, the user is redirected back to the app.

📦 Installation (For Developers)
# Clone repo
git clone https://github.com/your-username/decentfoodie.git

# Install dependencies
npm install

# Run locally
npm run dev


You’ll need to set these environment variables:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
INTASEND_SECRET_KEY=your_intasend_secret
INTASEND_PUBLIC_KEY=your_intasend_public

🌍 SDG Impact

DecentFoodie directly supports SDG 2: Zero Hunger by:

Promoting structured, balanced meals.

Offering affordable meal plans.

Raising awareness of food planning and healthy eating.

👩‍💻 Contributors

Abraham Sitori — Hackathon Builder

AI Assistant (ChatGPT) — Coding Partner 🤝

📜 License

This project is for educational and hackathon purposes. Feel free to fork and improve!
