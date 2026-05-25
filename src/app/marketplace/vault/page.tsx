"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, Lock, Zap } from 'lucide-react';

const VAULT_PRODUCTS = [
  {
    id: 'vault-1',
    name: 'Nexus Overlord Framework',
    slug: 'nexus-overlord',
    description: 'Classified architecture for autonomous digital governance and neural overrides.',
    price: 999,
    category_id: '6',
    rarity: 'Legendary' as const,
    rarity_score: 99,
    image_urls: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800'],
    seller_id: 'seller1',
    created_at: new Date().toISOString(),
    is_approved: true,
    status: 'published' as const,
    stats: { sales: 5, views: 120, rating: 5.0 }
  }
];

export default function HiddenVaultPage() {
  return (
    <GlobalLayout>
      <div className="min-h-screen bg-cyber-black relative overflow-hidden">
        {/* Background Glitch Effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWU9zop1e/giphy.gif')] bg-cover" />

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block p-4 rounded-full bg-cyber-pink/10 mb-8 border border-cyber-pink/20"
            >
              <ShieldAlert size={48} className="text-cyber-pink animate-pulse" />
            </motion.div>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink via-white to-cyber-purple">
              The Hidden Vault
            </h1>
            <p className="text-white/40 font-mono uppercase tracking-[0.4em] text-xs">Access Restricted • Unauthorized Entry Logged</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <GlassCard className="p-8 border-cyber-pink/30 bg-cyber-pink/5">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-cyber-pink">
                  <Lock size={18} />
                  Decryption Required
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  These assets are classified Level 5 and above. They represent the pinnacle of neural engineering and autonomous scripts.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
                    <span>Decryption Progress</span>
                    <span>64%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '64%' }}
                      className="h-full bg-cyber-pink"
                    />
                  </div>
                </div>
              </GlassCard>

              <div className="p-8 rounded bg-cyber-purple/5 border border-cyber-purple/20">
                <div className="flex items-center gap-3 mb-4 text-cyber-purple font-bold uppercase tracking-widest text-xs">
                  <Zap size={14} />
                  <span>Vault Protocol</span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-mono">
                  Items discovered in the vault are unique. Once acquired, they may be permanently delisted from the global nexus to maintain exclusivity.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {VAULT_PRODUCTS.map((product) => (
                  <div key={product.id} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <ProductCard product={product as unknown as any} />
                    </div>
                  </div>
                ))}

                {/* Locked Placeholder */}
                <GlassCard className="aspect-[3/4] flex flex-col items-center justify-center border-dashed border-white/10 opacity-40 grayscale">
                  <Lock size={48} className="mb-4 text-white/20" />
                  <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Encrypted Archive</div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
