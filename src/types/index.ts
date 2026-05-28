export type Rarity = 'Common' | 'Rare' | 'Elite' | 'Legendary';

export type UserRole = 'user' | 'seller' | 'admin';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  xp: number;
  rank: string;
  badges: string[];
  bio?: string;
  social_links?: Record<string, string>;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  detailed_description?: string;
  price: number;
  category_id?: string;
  category?: Category;
  rarity: Rarity;
  rarity_score: number;
  image_url: string;
  image_urls: string[];
  video_url?: string;
  file_url?: string;
  demo_url?: string;
  seller_id: string;
  seller?: Partial<User>;
  is_approved: boolean;
  status: 'draft' | 'published' | 'archived';
  stats: {
    sales: number;
    views: number;
    rating: number;
  };
  created_at: string;
  features?: string[];
  faqs?: unknown[];
  reviews?: unknown[];
}

export interface ProductFAQ {
  id: string;
  product_id: string;
  question: string;
  answer: string;
}

export interface Transaction {
  id: string;
  user_id?: string;
  userId?: string;
  product_id?: string;
  productId?: string;
  product?: Partial<Product>;
  amount: number;
  payment_method?: string;
  method?: string;
  transaction_id?: string;
  txId?: string;
  screenshot_url?: string;
  screenshot?: string;
  status: string;
  created_at?: string;
  date?: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user?: Partial<User>;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  creator_id?: string;
  is_public: boolean;
  type: 'user' | 'featured' | 'vault';
  products?: Product[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  secret: boolean;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  link?: string;
  created_at: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  link?: { label: string; url: string };
}

export interface EasterEgg {
  id: string;
  code: string;
  reward_type: 'discount' | 'xp' | 'badge' | 'vault_access';
  reward_value: string | number | null;
  is_active: boolean;
}

export interface SellerApplication {
  id: string;
  user_id: string;
  portfolio_url?: string;
  experience_summary?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
}
