"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { TrendingUp, Clock } from 'lucide-react';

const TRENDING_PRODUCTS = [
  {
    id: '2',
    name: 'Cyber Nexus Prompt Pack',
    description: '1000+ elite prompts for generative AI mastery.',
    price: 49,
    rarity: 'Elite' as const,
    image_url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800',
    category: 'Prompts',
    stats: { sales: 842, views: 15600, rating: 4.8 }
  },
  {
    id: '5',
    name: 'AI Agent Script',
    description: 'Autonomous Python script for local LLM orchestration.',
    price: 29,
    rarity: 'Common' as const,
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    category: 'Scripts',
    stats: { sales: 2400, views: 12000, rating: 4.6 }
  }
];

export default function TrendingPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div>
              <div className="flex items-center gap-3 text-cyber-blue mb-4 uppercase tracking-[0.4em] font-mono text-[10px]">
                 <TrendingUp size={14} />
                 Market Surge Detected
              </div>
              <h1 className="text-6xl font-black uppercase tracking-tighter">Trending Drops</h1>
              <p className="text-white/40 leading-relaxed uppercase text-xs tracking-widest mt-2">Neural assets with the highest acquisition frequency in the last 24 cycles.</p>
           </div>
           <div className="flex gap-4">
              <div className="px-6 py-3 glass-panel border border-white/10 flex items-center gap-3">
                 <Clock size={14} className="text-white/30" />
                 <span className="text-[10px] font-bold uppercase text-white/60">Updated 14m ago</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRENDING_PRODUCTS.map((p) => (
            <div key={p.id} className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg blur opacity-10 group-hover:opacity-40 transition-all duration-1000" />
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
               <ProductCard product={{...p, created_at: '', is_approved: true, seller_id: '', status: 'published', rarity_score: 0, image_urls: [p.image_url], slug: ''} as unknown as any} />
            </div>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
}
