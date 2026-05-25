"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { BootSequence } from '@/components/layout/BootSequence';
import { Product } from '@/types';
import { Terminal, ShoppingBag, Shield, Zap } from 'lucide-react';

const FEATURED_PRODUCTS: Product[] = [
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
  }
];

export default function Home() {
  const [booted, setBooted] = useState(false);

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
              <NeonButton variant="cyan" className="px-10 py-4 text-sm">Explore Marketplace</NeonButton>
              <NeonButton variant="purple" glow={false} className="px-10 py-4 text-sm">Open Your Shop</NeonButton>
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
            <NeonButton variant="cyan" className="px-6 py-2 text-[10px]">View All Assets</NeonButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Live Activity Feed */}
        <section className="mb-32">
          <GlassCard className="p-0 overflow-hidden border-cyber-blue/20">
            <div className="p-6 border-b border-white/5 bg-cyber-blue/5 flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                Live Nexus Activity
              </h2>
              <span className="text-[10px] text-white/40">SYNCING WITH GLOBAL NODES...</span>
            </div>
            <div className="p-6 space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-cyber-blue/10 flex items-center justify-center text-cyber-blue">
                      <Zap size={14} />
                    </div>
                    <span className="text-white/80">
                      <span className="text-cyber-blue font-mono font-bold">User_9283</span> acquired <span className="text-rarity-elite font-bold">Cyber Nexus Prompt Pack</span>
                    </span>
                  </div>
                  <span className="text-white/30 text-[10px] font-mono">{i + 2}m ago</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </GlobalLayout>
  );
}
