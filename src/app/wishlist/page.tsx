"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Heart, Trash2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { NeonButton } from '@/components/ui/NeonButton';

const MOCK_WISHLIST = [
  {
    id: '3',
    name: 'Holographic UI Kit',
    price: 89,
    rarity: 'Rare' as const,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    category: 'Design'
  },
  {
    id: '6',
    name: 'Nexus Security Suite',
    price: 199,
    rarity: 'Legendary' as const,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
    category: 'Security'
  },
];

export default function WishlistPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="mb-16">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
            Neural Wishlist
            <Heart size={32} className="text-cyber-pink fill-cyber-pink" />
          </h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Tracking priority neural signatures for future acquisition</p>
        </div>

        {MOCK_WISHLIST.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence>
              {MOCK_WISHLIST.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <GlassCard className="p-0 overflow-hidden group">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden border-r border-white/5 relative">
                         <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             <span className={cn(
                               "text-[8px] font-black uppercase border px-2 py-0.5 rounded",
                               item.rarity === 'Legendary' ? 'text-rarity-legendary border-rarity-legendary/20' : 'text-rarity-rare border-rarity-rare/20'
                             )}>{item.rarity}</span>
                             <span className="text-[10px] text-white/20 uppercase font-mono">{item.category}</span>
                          </div>
                          <h3 className="text-xl font-bold uppercase tracking-widest text-white group-hover:text-cyber-blue transition-colors">{item.name}</h3>
                          <div className="text-2xl font-mono font-bold text-cyber-blue mt-2">${item.price}</div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                           <button className="p-4 glass-panel border border-white/10 text-white/20 hover:text-cyber-pink transition-colors"><Trash2 size={20} /></button>
                           <Link href={`/marketplace/product/${item.id}`} className="flex-1 md:flex-none">
                              <NeonButton variant="cyan" className="w-full px-8 py-3 text-[10px] flex items-center gap-2">
                                 Initialize Acquisition
                                 <ArrowUpRight size={14} />
                              </NeonButton>
                           </Link>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-12 text-center">
               <Link href="/marketplace">
                  <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-cyber-blue transition-colors border-b border-white/10 pb-2">Continue Neural Exploration</button>
               </Link>
            </div>
          </div>
        ) : (
          <GlassCard className="py-24 text-center">
            <Heart size={48} className="mx-auto text-white/10 mb-6" />
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">No Targets Logged</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed mb-10 max-w-xs mx-auto">Your neural frequency has not logged any priority assets. Visit the marketplace to begin tracking signatures.</p>
            <Link href="/marketplace">
               <NeonButton variant="cyan" className="px-10 py-4 text-xs">Browse Archive</NeonButton>
            </Link>
          </GlassCard>
        )}
      </div>
    </GlobalLayout>
  );
}

import { cn } from '@/lib/utils';
