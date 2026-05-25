"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { ShoppingCart, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCartStore();

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="flex items-end justify-between mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Neural Cart</h1>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest mt-2">Ready for acquisition sequence</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[10px] text-white/30 hover:text-cyber-pink uppercase tracking-widest flex items-center gap-2 transition-colors"
            >
              <Trash2 size={12} /> Purge Cart
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <GlassCard className="p-6 flex items-center gap-6">
                      <div className="w-20 h-20 rounded overflow-hidden border border-white/10 shrink-0">
                        <img src={item.image_urls[0]} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-white/90">{item.name}</h3>
                            <div className="text-[10px] uppercase tracking-widest text-cyber-blue font-mono mt-1">
                              Rarity: {item.rarity}
                            </div>
                          </div>
                          <div className="text-xl font-mono text-cyber-blue">${item.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-3 text-white/20 hover:text-cyber-pink transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <GlassCard className="p-8 border-cyber-blue/30 bg-cyber-blue/5">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Acquisition Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white font-mono">${total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Nexus Protocol Fee</span>
                    <span className="text-cyber-green font-mono">$0.00</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Total Neural Units</span>
                    <span className="text-3xl font-mono font-bold text-cyber-blue">${total}</span>
                  </div>
                </div>

                <Link href="/marketplace/checkout">
                  <NeonButton variant="cyan" className="w-full py-4 text-sm flex items-center justify-center gap-3">
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </NeonButton>
                </Link>

                <div className="mt-6 flex items-center gap-3 justify-center text-[10px] uppercase tracking-widest text-white/30 font-mono">
                  <ShieldCheck size={14} className="text-cyber-blue" />
                  Escrow Protection Active
                </div>
              </GlassCard>

              <div className="p-6 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/40 leading-relaxed">
                By proceeding, you agree to the Nexus Asset Acquisition Protocol. Refunds are only available via Admin Dispute for corrupted neural scripts.
              </div>
            </div>
          </div>
        ) : (
          <GlassCard className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-8">
              <ShoppingCart size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white/80">Neural Cart is Empty</h2>
            <p className="text-white/40 max-w-xs mb-10">No assets detected in your current session queue. Start exploring the marketplace to add items.</p>
            <Link href="/marketplace">
              <NeonButton variant="cyan" className="px-10 py-4 text-xs flex items-center gap-2">
                <ShoppingBag size={16} />
                Explore Marketplace
              </NeonButton>
            </Link>
          </GlassCard>
        )}
      </div>
    </GlobalLayout>
  );
}
