"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { Eye, Zap, Shield, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export const ProductCard = ({ product }: { product: Product }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { addItem } = useCartStore();
  const rarityColors = {
    Common: 'text-rarity-common border-rarity-common/30',
    Rare: 'text-rarity-rare border-rarity-rare/30',
    Elite: 'text-rarity-elite border-rarity-elite/30',
    Legendary: 'text-rarity-legendary border-rarity-legendary/30',
  };

  return (
    <GlassCard className="group h-full flex flex-col">
      <div className="relative h-48 mb-4 overflow-hidden rounded-md bg-white/5">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
        />
        <div className={cn(
          'absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase border bg-black/50',
          rarityColors[product.rarity]
        )}>
          {product.rarity}
        </div>
      </div>

      <Link href={`/marketplace/product/${product.id}`}>
        <h3 className="text-xl font-bold mb-1 group-hover:text-cyber-blue transition-colors cursor-pointer">{product.name}</h3>
      </Link>
      <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>

      <div className="mt-auto flex justify-between items-center">
        <span className="text-2xl font-mono text-cyber-blue">${product.price}</span>
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="p-2 glass-panel border border-white/10 rounded hover:text-cyber-blue transition-colors"
        >
          <Eye size={16} />
        </button>
        <Link href={`/marketplace/checkout?productId=${product.id}`}>
          <NeonButton variant="cyan" className="px-4 py-1.5 text-xs">Initialize</NeonButton>
        </Link>
      </div>

      {/* Quick Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl"
            >
              <GlassCard className="p-0 overflow-hidden border-cyber-blue/30">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-full relative border-r border-white/5">
                    <img src={product.image_url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  <div className="p-10 flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                       <div>
                          <div className="text-[8px] font-bold text-cyber-blue uppercase tracking-[0.4em] mb-2">Neural Quick Scan</div>
                          <h2 className="text-3xl font-black uppercase tracking-tighter">{product.name}</h2>
                       </div>
                       <button onClick={() => setIsPreviewOpen(false)} className="text-white/20 hover:text-white transition-colors"><X size={24} /></button>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-8 uppercase tracking-widest">{product.description}</p>

                    <div className="space-y-4 mb-10">
                       <div className="flex items-center gap-3 text-xs text-white/80">
                          <Zap size={14} className="text-cyber-blue" />
                          <span>Rarity Rank: {product.rarity}</span>
                       </div>
                       <div className="flex items-center gap-3 text-xs text-white/80">
                          <Shield size={14} className="text-cyber-blue" />
                          <span>Escrow Verified Link</span>
                       </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                       <div className="flex justify-between items-end mb-2">
                          <span className="text-[10px] text-white/30 uppercase tracking-widest">Acquisition Cost</span>
                          <span className="text-3xl font-mono font-bold text-cyber-blue">${product.price}</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <NeonButton
                            onClick={() => { addItem(product); setIsPreviewOpen(false); }}
                            variant="purple"
                            className="py-4 text-[10px] flex items-center justify-center gap-2"
                          >
                             <ShoppingCart size={14} /> Add to Cart
                          </NeonButton>
                          <Link href={`/marketplace/product/${product.id}`}>
                             <NeonButton variant="cyan" className="w-full py-4 text-[10px]">Full Intel</NeonButton>
                          </Link>
                       </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};
