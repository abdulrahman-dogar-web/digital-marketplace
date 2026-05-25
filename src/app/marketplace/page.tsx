"use client";

import { useState } from 'react';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Product, Rarity, Category } from '@/types';
import { Search, Filter, SlidersHorizontal, Grid, List, TrendingUp, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';
import { useProducts } from '@/hooks/useSupabase';

// Expanded Mock Data
const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Automation', slug: 'automation', icon: '🤖' },
  { id: '2', name: 'Prompts', slug: 'prompts', icon: '✍️' },
  { id: '3', name: 'Design', slug: 'design', icon: '🎨' },
  { id: '4', name: 'SaaS', slug: 'saas', icon: '☁️' },
  { id: '5', name: 'Scripts', slug: 'scripts', icon: '📜' },
  { id: '6', name: 'Security', slug: 'security', icon: '🛡️' },
];

const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neural Automation Suite',
    slug: 'neural-automation-suite',
    description: 'A complete AI-driven automation framework for futuristic SaaS management.',
    price: 299,
    category_id: '1',
    rarity: 'Legendary' as const,
    rarity_score: 98,
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800',
    image_urls: ['https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800'],
    seller_id: 'seller1',
    created_at: new Date().toISOString(),
    is_approved: true,
    status: 'published' as const,
    stats: { sales: 124, views: 8420, rating: 4.9 }
  },
  {
    id: '2',
    name: 'Cyber Nexus Prompt Pack',
    slug: 'cyber-nexus-prompt-pack',
    description: '1000+ elite prompts for generative AI mastery and high-conversion outputs.',
    price: 49,
    category_id: '2',
    rarity: 'Elite' as const,
    rarity_score: 85,
    image_url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800',
    image_urls: ['https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800'],
    seller_id: 'seller2',
    created_at: new Date().toISOString(),
    is_approved: true,
    status: 'published' as const,
    stats: { sales: 842, views: 15600, rating: 4.8 }
  },
  {
    id: '3',
    name: 'Holographic UI Kit',
    slug: 'holographic-ui-kit',
    description: 'Next-gen design system for futuristic web applications and immersive interfaces.',
    price: 89,
    category_id: '3',
    rarity: 'Rare' as const,
    rarity_score: 65,
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    image_urls: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'],
    seller_id: 'seller3',
    created_at: new Date().toISOString(),
    is_approved: true,
    status: 'published' as const,
    stats: { sales: 312, views: 5400, rating: 4.7 }
  },
  {
    id: '4',
    name: 'SaaS Startup Accelerator',
    slug: 'saas-startup-accelerator',
    description: 'Comprehensive toolkit for launching your next digital empire in record time.',
    price: 149,
    category_id: '4',
    rarity: 'Elite' as const,
    rarity_score: 82,
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    image_urls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'],
    seller_id: 'seller1',
    created_at: new Date().toISOString(),
    is_approved: true,
    status: 'published' as const,
    stats: { sales: 156, views: 3200, rating: 4.9 }
  },
  {
    id: '5',
    name: 'AI Agent Script',
    slug: 'ai-agent-script',
    description: 'Autonomous Python script for local LLM orchestration and task execution.',
    price: 29,
    category_id: '5',
    rarity: 'Common' as const,
    rarity_score: 30,
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    image_urls: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'],
    seller_id: 'seller4',
    created_at: new Date().toISOString(),
    is_approved: true,
    status: 'published' as const,
    stats: { sales: 2400, views: 12000, rating: 4.6 }
  },
  {
    id: '6',
    name: 'Nexus Security Suite',
    slug: 'nexus-security-suite',
    description: 'Advanced encryption and protection layers for your digital assets.',
    price: 199,
    category_id: '6',
    rarity: 'Legendary' as const,
    rarity_score: 95,
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    image_urls: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'],
    seller_id: 'seller2',
    created_at: new Date().toISOString(),
    is_approved: true,
    status: 'published' as const,
    stats: { sales: 56, views: 2800, rating: 5.0 }
  }
];

export default function MarketplacePage() {
  const { products: dbProducts, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeRarity, setActiveRarity] = useState<Rarity | 'All'>('All');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products = dbProducts.length > 0 ? dbProducts : ALL_PRODUCTS; // Fallback to mock if DB empty

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || p.category_id === activeCategory;
    const matchesRarity = activeRarity === 'All' || p.rarity === activeRarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel border border-cyber-blue/30 rounded-full text-[10px] uppercase tracking-widest text-cyber-blue mb-4">
              <ShieldCheck size={12} />
              Verified Distribution Node
            </div>
            <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Marketplace Archive</h1>
            <p className="text-white/40 max-w-lg">Accessing global neural asset distribution network. Currently hosting {ALL_PRODUCTS.length} active nodes.</p>
          </div>

          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="text"
                placeholder="Search Archive..."
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex glass-panel border border-white/10 p-1 rounded">
              <button
                onClick={() => setViewMode('grid')}
                className={cn("p-2 rounded transition-all", viewMode === 'grid' ? "bg-cyber-blue text-black" : "text-white/40 hover:text-white")}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn("p-2 rounded transition-all", viewMode === 'list' ? "bg-cyber-blue text-black" : "text-white/40 hover:text-white")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access Bar */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { label: 'Trending', icon: TrendingUp, slug: 'trending' },
            { label: 'AI Picks', icon: Sparkles, slug: 'ai-picks' },
            { label: 'Daily Drops', icon: Clock, slug: 'daily-drops' },
            { label: 'The Vault', icon: ShieldCheck, slug: 'vault' },
          ].map((nav) => (
            <Link key={nav.slug} href={`/marketplace/${nav.slug}`}>
              <GlassCard className="flex items-center gap-3 px-6 py-3 whitespace-nowrap hover:border-cyber-blue/50 transition-all cursor-pointer group">
                <nav.icon size={16} className="text-cyber-blue group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">{nav.label}</span>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <aside className="space-y-8">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-cyber-blue font-bold uppercase tracking-widest text-xs">
                  <Filter size={14} />
                  <span>Categories</span>
                </div>
                {activeCategory && <button onClick={() => setActiveCategory(null)} className="text-[10px] text-white/30 hover:text-white uppercase tracking-widest underline">Reset</button>}
              </div>
              <div className="space-y-2">
                {MOCK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-2.5 rounded text-sm transition-all',
                      activeCategory === cat.id ? 'bg-cyber-blue/10 text-cyber-blue font-bold border border-cyber-blue/20' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    <span className="text-[10px] opacity-50">12</span>
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
                {['All', 'Common', 'Rare', 'Elite', 'Legendary'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRarity(r as Rarity | 'All')}
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded text-sm transition-all border border-transparent',
                      activeRarity === r ? 'bg-cyber-purple/10 text-cyber-purple font-bold border-cyber-purple/20' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Creator Spotlight */}
            <GlassCard className="p-6 bg-cyber-pink/5 border-cyber-pink/20">
              <h3 className="text-[10px] uppercase tracking-widest text-cyber-pink font-bold mb-4">Creator Spotlight</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded bg-white/5 border border-white/10" />
                <div>
                  <div className="text-sm font-bold">Admin_Nexus</div>
                  <div className="text-[10px] text-white/40 uppercase">Top Seller • 5k Sales</div>
                </div>
              </div>
              <NeonButton variant="pink" className="w-full py-2 text-[10px]">View Profile</NeonButton>
            </GlassCard>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                Displaying {filteredProducts.length} neural signatures
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest text-white/30">Sort By:</span>
                <select
                  className="bg-transparent text-[10px] uppercase tracking-widest text-cyber-blue focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="trending" className="bg-cyber-black">Trending</option>
                  <option value="newest" className="bg-cyber-black">Latest Drops</option>
                  <option value="price-low" className="bg-cyber-black">Price: Low to High</option>
                  <option value="price-high" className="bg-cyber-black">Price: High to Low</option>
                  <option value="rarity" className="bg-cyber-black">Neural Rarity</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <GlassCard key={i} className="aspect-[3/4] animate-pulse bg-white/5 border-white/5">
                    <div className="w-full h-full" />
                  </GlassCard>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={cn(
                "grid gap-8",
                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-center glass-panel rounded-lg border-dashed border-white/10">
                <div className="text-cyber-pink text-4xl mb-4 font-black uppercase tracking-tighter">404_NULL_REF</div>
                <p className="text-white/40 max-w-xs uppercase text-[10px] tracking-widest">No assets found matching your neural signature. Try recalibrating your filters.</p>
              </div>
            )}

            {/* Pagination / Load More */}
            <div className="mt-16 flex justify-center">
              <NeonButton variant="cyan" className="px-12 py-4 text-sm">Load More Assets</NeonButton>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

import Link from 'next/link';
