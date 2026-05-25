-- CYBERNEST NEURAL DATABASE SCHEMA
-- REVISION: 4.2.0 (STABLE)

-- 1. Profiles Table (Citizens)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  rank TEXT DEFAULT 'Explorer',
  xp INTEGER DEFAULT 0,
  bio TEXT,
  is_seller BOOLEAN DEFAULT FALSE,
  seller_approved BOOLEAN DEFAULT FALSE,
  whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Categories
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT
);

-- 3. Products (Neural Assets)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category_id BIGINT REFERENCES categories(id) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  rarity TEXT DEFAULT 'Common',
  rarity_score INTEGER DEFAULT 0,
  image_url TEXT,
  image_urls TEXT[],
  file_url TEXT, -- Secure storage link
  is_approved BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending', -- pending, published, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Transactions (Neural Exchanges)
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES profiles(id) NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL, -- Easypaisa, JazzCash, Binance
  transaction_id TEXT UNIQUE NOT NULL,
  screenshot_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Easter Eggs
CREATE TABLE easter_eggs (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_pct INTEGER NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  discovered_by UUID REFERENCES profiles(id),
  reset_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_DATE + INTERVAL '1 day')
);

-- 6. Achievements
CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  badge_icon TEXT,
  xp_reward INTEGER DEFAULT 100
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Basic Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Approved products are viewable by everyone." ON products FOR SELECT USING (is_approved = true OR auth.uid() = seller_id);
CREATE POLICY "Sellers can insert their own products." ON products FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Buyers can view their own transactions." ON transactions FOR SELECT USING (auth.uid() = buyer_id);
