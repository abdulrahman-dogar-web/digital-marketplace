"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Product, Rarity } from '@/types';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neural Automation Suite',
    description: 'A complete AI-driven automation framework for futuristic SaaS management.',
    price: 299,
    category: 'Automation',
    rarity: 'Legendary',
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800',
    seller_id: 'seller1',
    created_at: new Date().toISOString(),
    is_approved: true,
  },
  {
    id: '2',
    name: 'Cyber Nexus Prompt Pack',
    description: '1000+ elite prompts for generative AI mastery and high-conversion outputs.',
    price: 49,
    category: 'Prompts',
    rarity: 'Elite',
    image_url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800',
    seller_id: 'seller2',
    created_at: new Date().toISOString(),
    is_approved: true,
  },
  {
    id: '3',
    name: 'Holographic UI Kit',
    description: 'Next-gen design system for futuristic web applications and immersive interfaces.',
    price: 89,
    category: 'Design',
    rarity: 'Rare',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    seller_id: 'seller3',
    created_at: new Date().toISOString(),
    is_approved: true,
  },
  {
    id: '4',
    name: 'SaaS Startup Accelerator',
    description: 'Comprehensive toolkit for launching your next digital empire in record time.',
    price: 149,
    category: 'SaaS',
    rarity: 'Elite',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    seller_id: 'seller1',
    created_at: new Date().toISOString(),
    is_approved: true,
  },
  {
    id: '5',
    name: 'AI Agent Script',
    description: 'Autonomous Python script for local LLM orchestration and task execution.',
    price: 29,
    category: 'Scripts',
    rarity: 'Common',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    seller_id: 'seller4',
    created_at: new Date().toISOString(),
    is_approved: true,
  },
  {
    id: '6',
    name: 'Nexus Security Suite',
    description: 'Advanced encryption and protection layers for your digital assets.',
    price: 199,
    category: 'Security',
    rarity: 'Legendary',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    seller_id: 'seller2',
    created_at: new Date().toISOString(),
    is_approved: true,
  }
];

const CATEGORIES = ['All', 'Automation', 'Prompts', 'Design', 'SaaS', 'Scripts', 'Security'];
const RARITIES: (Rarity | 'All')[] = ['All', 'Common', 'Rare', 'Elite', 'Legendary'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [rarity, setRarity] = useState<Rarity | 'All'>('All');

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    const matchesRarity = rarity === 'All' || p.rarity === rarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="mb-16">
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Marketplace Archive</h1>
          <p className="text-white/40">Accessing global distribution nodes...</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <aside className="space-y-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Archive..."
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors"
              />
            </div>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-6 text-cyber-blue font-bold uppercase tracking-widest text-xs">
                <Filter size={14} />
                <span>Categories</span>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded text-sm transition-colors',
                      category === cat ? 'bg-cyber-blue/10 text-cyber-blue font-bold' : 'text-white/40 hover:text-white/70'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-6 text-cyber-purple font-bold uppercase tracking-widest text-xs">
                <SlidersHorizontal size={14} />
                <span>Rarity Level</span>
              </div>
              <div className="space-y-2">
                {RARITIES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRarity(r)}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded text-sm transition-colors',
                      rarity === r ? 'bg-cyber-purple/10 text-cyber-purple font-bold' : 'text-white/40 hover:text-white/70'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </GlassCard>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8 text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
              <span>Displaying {filteredProducts.length} results</span>
              <span>Sorting: Newest First</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-center glass-panel rounded-lg border-dashed border-white/10">
                <div className="text-cyber-pink text-4xl mb-4 font-black">404_NOT_FOUND</div>
                <p className="text-white/40 max-w-xs">No assets found matching your neural signature. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
