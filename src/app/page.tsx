"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { BootSequence } from '@/components/layout/BootSequence';
import { NexusActivityFeed } from '@/components/layout/NexusActivityFeed';
import { Product } from '@/types';
import { Terminal, ShoppingBag, Shield, Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (booted) {
      const fetchFeatured = async () => {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('status', 'published')
            .eq('is_approved', true)
            .limit(3);

          if (error) throw error;
          setFeaturedProducts(data as Product[]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchFeatured();
    }
  }, [booted]);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 border border-cyber-blue/30 rounded-full text-[10px] uppercase tracking-[0.3em] text-cyber-blue mb-6 bg-cyber-blue/5">
              Nexus Protocol Activated
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
              EVOLVE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink">
                DIGITAL REALITY
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl mb-10 leading-relaxed">
              CyberNest is the premier futuristic AI marketplace. Explore elite tools, legendary scripts, and neural systems designed for the next generation of digital civilization.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/marketplace">
                <NeonButton variant="cyan" className="px-10 py-4 text-sm">Explore Marketplace</NeonButton>
              </Link>
              <Link href="/auth/signup">
                <NeonButton variant="purple" className="px-10 py-4 text-sm">Initialize Node</NeonButton>
              </Link>
            </div>

            <div className="mt-12 flex flex-col items-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Fast-Track Authentication</p>
              <button
                onClick={() => window.location.href = '/auth/login'}
                className="flex items-center gap-3 px-6 py-3 glass-panel border border-white/10 rounded-full hover:bg-white/5 transition-all group"
              >
                <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">Secure Login with Google</span>
              </button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mt-32">
            {[
              { label: 'Active Agents', value: '12,482', icon: Terminal },
              { label: 'Neural Units', value: '8.4M+', icon: Zap },
              { label: 'Secure Vaults', value: '592', icon: Shield },
              { label: 'Daily Exchanges', value: '2.1k', icon: ShoppingBag },
            ].map((stat, i) => (
              <GlassCard key={i} className="py-4 px-6 text-center">
                <stat.icon className="mx-auto mb-2 text-cyber-blue/60" size={20} />
                <div className="text-2xl font-mono font-bold text-cyber-blue">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-2 uppercase tracking-tighter">Legendary Drops</h2>
              <p className="text-white/40 text-sm">Curated neural assets currently trending in the nexus.</p>
            </div>
            <Link href="/marketplace">
              <NeonButton variant="cyan" className="px-6 py-2 text-[10px]">View All Assets</NeonButton>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-cyber-blue" /></div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-xl">
               <p className="text-white/20 uppercase tracking-[0.3em] text-xs">Awaiting Neural Synchronization...</p>
            </div>
          )}
        </section>

        {/* Live Activity Feed */}
        <section className="mb-32">
          <NexusActivityFeed />
        </section>
      </div>
    </GlobalLayout>
  );
}
