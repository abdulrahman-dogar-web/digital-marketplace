"use client";

import { useState, useEffect } from 'react';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Product, Rarity, Category } from '@/types';
import { Search, Filter, SlidersHorizontal, Grid, List, TrendingUp, Sparkles, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Automation', slug: 'automation', icon: '🤖' },
  { id: '2', name: 'Prompts', slug: 'prompts', icon: '✍️' },
  { id: '3', name: 'Design', slug: 'design', icon: '🎨' },
  { id: '4', name: 'SaaS', slug: 'saas', icon: '☁️' },
  { id: '5', name: 'Scripts', slug: 'scripts', icon: '📜' },
  { id: '6', name: 'Security', slug: 'security', icon: '🛡️' },
];

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeRarity, setActiveRarity] = useState<Rarity | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Neural Link Failure:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || p.category?.name === activeCategory;
    const matchesRarity = activeRarity === 'All' || p.rarity === activeRarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel border border-cyber-blue/30 rounded-full text-[10px] uppercase tracking-widest text-cyber-blue mb-4">
              <ShieldCheck size={12} />
              Verified Distribution Node
            </div>
            <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Marketplace Archive</h1>
            <p className="text-white/40 max-w-lg">Accessing global neural asset distribution network. Currently hosting {products.length} active nodes.</p>
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
                    onClick={() => setActiveCategory(cat.name)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-2.5 rounded text-sm transition-all',
                      activeCategory === cat.name ? 'bg-cyber-blue/10 text-cyber-blue font-bold border border-cyber-blue/20' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    <span className="text-[10px] opacity-50">#</span>
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
          </aside>

          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                Displaying {filteredProducts.length} neural signatures
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-12 h-12 text-cyber-blue animate-spin" />
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
                <p className="text-white/40 max-w-xs uppercase text-[10px] tracking-widest">No assets found matching your neural signature.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
