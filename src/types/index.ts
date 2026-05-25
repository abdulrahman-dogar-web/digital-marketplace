export type Rarity = 'Common' | 'Rare' | 'Elite' | 'Legendary';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rarity: Rarity;
  image_url: string;
  seller_id: string;
  created_at: string;
  is_approved: boolean;
  file_url?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  role: 'user' | 'seller' | 'admin';
  xp: number;
  rank: string;
  badges: string[];
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  product_id: string;
  amount: number;
  payment_method: 'bank' | 'easypaisa' | 'jazzcash' | 'binance';
  transaction_id: string;
  screenshot_url: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
