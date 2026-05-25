-- CyberNest Database Schema (PostgreSQL / Supabase)

-- 1. Users Table
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'seller', 'admin')),
  xp INTEGER DEFAULT 0,
  rank TEXT DEFAULT 'Explorer',
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT,
  rarity TEXT DEFAULT 'Common' CHECK (rarity IN ('Common', 'Rare', 'Elite', 'Legendary')),
  image_url TEXT,
  file_url TEXT,
  seller_id UUID REFERENCES users(id) NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Transactions Table (Escrow)
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('bank', 'easypaisa', 'jazzcash', 'binance')),
  transaction_id TEXT UNIQUE NOT NULL,
  screenshot_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 5. Policies (Basic Examples)
CREATE POLICY "Public products are viewable by everyone" ON products
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view everything" ON transactions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
