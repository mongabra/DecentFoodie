# 🍽️ DecentFoodie

DecentFoodie is a comprehensive meal-planning web application built for promoting healthy eating habits and supporting SDG 2 (Zero Hunger). The app features authentic African cuisine alongside international breakfast options, secure user authentication, and premium subscription functionality.

## 🌟 Live Demo

**Frontend**: [https://mongabra-tasty-unloc-jpj5.bolt.host](https://mongabra-tasty-unloc-jpj5.bolt.host)


**Pitch Deck**: 
[https://decentfoodie-your-ultima-hkzowr6.gamma.site/]

## 🚀 Features

### ✅ Core Features
- **User Authentication** - Secure sign-up/sign-in with Supabase Auth
- **Daily Meal Planning** - View today's breakfast, lunch, and supper recommendations
- **Weekly Meal Timetable** - Complete 7-day meal planning overview
- **African Cuisine Focus** - Authentic dishes from West, East, North, and South Africa
- **Recipe Collection** - Detailed ingredients and step-by-step cooking instructions
- **Premium Subscription** - Unlock exclusive recipes and advanced features
- **Payment Integration** - Secure payments via IntaSend for premium access
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### 🍽️ Meal Categories

**Breakfast** (International Options):
- Avocado Toast Bowl, Oatmeal, Smoothie Bowls, Pancakes, French Toast

**Lunch** (African Dishes):
- Jollof Rice with Grilled Tilapia (West Africa)
- Thieboudienne - Senegalese Fish Rice
- Fufu with Egusi Soup (Nigeria)
- Moroccan Couscous with Vegetables
- Bunny Chow - South African Curry

**Supper** (African Dishes):
- Ugali with Sukuma Wiki & Nyama Choma (Kenya)
- Injera with Doro Wat (Ethiopia)
- Bobotie with Yellow Rice (South Africa)
- Berbere Spiced Beef (Ethiopia)
- Nigerian Pepper Soup with Pounded Yam

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Database + Auth + Edge Functions)
- **Payments**: IntaSend Payment Gateway
- **Deployment**: Bolt Hosting
- **State Management**: React Query + Context API

## 📂 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── MealCard.tsx     # Meal display component
│   ├── Navigation.tsx   # App navigation
│   ├── PaymentModal.tsx # Payment interface
│   └── ProtectedRoute.tsx
├── pages/               # Route components
│   ├── Index.tsx        # Dashboard page
│   ├── Auth.tsx         # Authentication page
│   ├── Weekly.tsx       # Weekly meal plan
│   ├── Recipes.tsx      # Recipe collection
│   ├── Premium.tsx      # Subscription page
│   └── NotFound.tsx
├── hooks/               # Custom React hooks
│   └── useAuth.tsx      # Authentication logic
├── integrations/        # External service integrations
│   └── supabase/        # Supabase client and types
└── lib/                 # Utility functions

supabase/
├── functions/           # Edge functions
│   └── intasend-payments/ # Payment processing
└── migrations/          # Database schema
```

## 🗄️ Database Schema

### Tables

**meals**
- `id` (uuid, primary key)
- `day` (text) - Day of the week
- `meal_type` (text) - breakfast/lunch/supper
- `title` (text) - Meal name
- `is_premium` (boolean) - Premium access required

**recipes**
- `id` (uuid, primary key)
- `meal_id` (uuid, foreign key)
- `ingredients` (text array)
- `instructions` (text array)

**users**
- `id` (uuid, primary key)
- `email` (text, unique)
- `created_at` (timestamptz)

**payments**
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `amount` (decimal)
- `subscription_type` (text)
- `status` (text)
- `intasend_invoice_id` (text)

## 🔐 Authentication & Security

- **Supabase Auth** with email/password authentication
- **Row Level Security (RLS)** enabled on all tables
- **Protected Routes** requiring authentication
- **Secure payment processing** via IntaSend edge functions

## 💳 Payment Integration

- **IntaSend Payment Gateway** for African market support
- **Subscription Plans**:
  - Free: Basic meal planning + 50 recipes
  - Premium ($9.99/month): 500+ recipes + advanced features
  - Family ($19.99/month): Premium + family coordination
- **Secure webhook handling** for payment confirmations

## 🌍 SDG Impact

DecentFoodie directly supports **SDG 2: Zero Hunger** by:

- **Promoting structured meal planning** to reduce food waste
- **Featuring nutritionally balanced African dishes** to celebrate local cuisine
- **Providing affordable meal planning solutions** for families
- **Educating users** about traditional cooking methods and ingredients
- **Supporting local food systems** through African recipe promotion

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- IntaSend account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/decentfoodie.git
   cd decentfoodie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migrations in the `supabase/migrations/` folder
   - Configure authentication settings
   - Deploy the edge function for payments

5. **Configure IntaSend**
   - Create IntaSend account
   - Add API keys to Supabase edge function environment

6. **Run the development server**
   ```bash
   npm run dev
   ```

### Deployment

The app is configured for deployment on Bolt Hosting:

```bash
npm run build
```

## 🎨 Design System

The app uses a food-themed design system with:

- **Color Palette**: Warm ambers, fresh greens, rich browns
- **Gradients**: Meal-specific gradients (breakfast, lunch, supper, premium)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach with breakpoints

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Features in Detail

### Meal Planning
- **Daily View**: Today's breakfast, lunch, and supper
- **Weekly Overview**: Complete 7-day meal calendar
- **African Cuisine**: Authentic dishes from across Africa
- **Nutritional Balance**: Protein, carbs, and vegetables in each meal

### Premium Features
- **500+ Premium Recipes**: Exclusive African and international dishes
- **Advanced Meal Planning**: 4-week advance planning
- **Smart Grocery Lists**: Auto-generated shopping lists
- **Nutritional Analysis**: Detailed nutrition tracking

### Payment System
- **Secure Checkout**: IntaSend payment gateway
- **Subscription Management**: Monthly billing cycles
- **Multiple Payment Methods**: Cards and M-Pesa support
- **Webhook Integration**: Real-time payment status updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Abraham Sitori** - Project Creator & Developer
- **AI Assistant** - Development Partner

## 🙏 Acknowledgments

- **Supabase** for backend infrastructure
- **IntaSend** for payment processing
- **shadcn/ui** for beautiful UI components
- **African culinary traditions** for meal inspiration

## 📞 Support

For support, email support@decentfoodie.com or create an issue in this repository.

---

**Built with ❤️ for promoting healthy eating habits and celebrating African cuisine**
