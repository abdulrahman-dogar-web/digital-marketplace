"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Lock, EyeOff, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardVaultPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="mb-16">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
             Personal Vault
             <Shield size={32} className="text-cyber-pink" />
          </h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Secure storage for high-rarity neural signatures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Empty State / Locked Slot */}
           <GlassCard className="aspect-[3/4] flex flex-col items-center justify-center border-cyber-pink/20 bg-cyber-pink/5 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-pink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Lock size={48} className="text-cyber-pink mb-6 animate-pulse" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-white/40">Vault Slot 01</h3>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mt-2">Neural Link Required</p>
           </GlassCard>

           <GlassCard className="aspect-[3/4] flex flex-col items-center justify-center border-white/5 opacity-20 grayscale">
              <EyeOff size={40} className="text-white/20 mb-6" />
              <h3 className="text-lg font-bold uppercase tracking-tighter">Slot 02</h3>
              <p className="text-[8px] uppercase tracking-widest mt-2">Locked</p>
           </GlassCard>

           <GlassCard className="aspect-[3/4] flex flex-col items-center justify-center border-white/5 opacity-20 grayscale">
              <EyeOff size={40} className="text-white/20 mb-6" />
              <h3 className="text-lg font-bold uppercase tracking-tighter">Slot 03</h3>
              <p className="text-[8px] uppercase tracking-widest mt-2">Locked</p>
           </GlassCard>
        </div>

        <div className="mt-20 p-12 glass-panel border border-cyber-pink/20 rounded-2xl flex flex-col md:flex-row items-center gap-12 bg-cyber-pink/5">
           <div className="w-24 h-24 rounded-full bg-cyber-pink/10 border border-cyber-pink/20 flex items-center justify-center shrink-0">
              <Zap size={40} className="text-cyber-pink" />
           </div>
           <div className="text-center md:text-left">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Initialize the Vault</h2>
              <p className="text-white/40 text-sm uppercase tracking-widest leading-relaxed max-w-lg">
                 The Personal Vault is reserved for Legendary and Elite tier assets. Once acquired, these assets are cryptographically bound to your neural signature and stored here for instant access.
              </p>
           </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
