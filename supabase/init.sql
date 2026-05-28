-- ==========================================
-- CYBERNEST AUTO-BACKEND INITIALIZATION
-- ==========================================
-- Copy and Paste this entire block into your
-- Supabase SQL Editor and click "Run".

-- 1. DROP EXISTING TO AVOID CONFLICTS (Caution: Destructive)
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS easter_eggs CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE; -- If you have a custom users table

-- 2. CREATE CORE TABLES
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user',
  xp INTEGER DEFAULT 0,
  rank TEXT DEFAULT 'Explorer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT
);

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  rarity TEXT DEFAULT 'Common',
  status TEXT DEFAULT 'published',
  is_approved BOOLEAN DEFAULT TRUE,
  seller_id UUID,
  category_id UUID REFERENCES categories(id),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE easter_eggs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  reward_value TEXT,
  rarity TEXT DEFAULT 'Common',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SEED INITIAL DATA
INSERT INTO users (id, username, email, role, xp, rank)
VALUES
('00000000-0000-0000-0000-000000000000', 'CyberAdmin', 'admin@cybernest.io', 'admin', 9999, 'Nexus Master'),
('77777777-7777-7777-7777-777777777777', 'Operator_X', 'seller@cybernest.io', 'seller', 1500, 'Cyber Agent'),
('88888888-8888-8888-8888-888888888888', 'Explorer_Alpha', 'user@cybernest.io', 'user', 100, 'Explorer');

INSERT INTO categories (id, name, slug, icon)
VALUES
('c1000000-0000-0000-0000-000000000000', 'Automation', 'automation', '🤖'),
('c2000000-0000-0000-0000-000000000000', 'Prompts', 'prompts', '✍️'),
('c3000000-0000-0000-0000-000000000000', 'SaaS', 'saas', '☁️');

INSERT INTO products (name, description, price, rarity, seller_id, category_id, image_url)
VALUES
('Neural Automator Pro', 'AI-driven workflow optimization for elite agents.', 299.00, 'Elite', '77777777-7777-7777-7777-777777777777', 'c1000000-0000-0000-0000-000000000000', 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800'),
('Cyber Genesis Prompts', 'Master-level prompts for high-fidelity neural generation.', 49.99, 'Rare', '77777777-7777-7777-7777-777777777777', 'c2000000-0000-0000-0000-000000000000', 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800'),
('Nexus Cloud OS', 'The ultimate decentralized SaaS operating utility.', 899.00, 'Legendary', '77777777-7777-7777-7777-777777777777', 'c3000000-0000-0000-0000-000000000000', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800');

INSERT INTO easter_eggs (code, reward_value, rarity)
VALUES
('NEURAL_LINK', '50% Discount Code', 'Rare'),
('CYBER_PUNK', 'Legendary Badge', 'Legendary'),
('GHOST_NODE', 'Secret Vault Access', 'Elite');

-- 4. ENABLE ACCESS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE easter_eggs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access" ON users FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON transactions FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON easter_eggs FOR SELECT USING (true);

-- Allow insertions (Open for demo/MVP)
CREATE POLICY "Allow Insertions" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Insertions" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Insertions" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Insertions" ON easter_eggs FOR INSERT WITH CHECK (true);

-- Allow updates for demo
CREATE POLICY "Allow Updates" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow Updates" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow Updates" ON transactions FOR UPDATE USING (true);
