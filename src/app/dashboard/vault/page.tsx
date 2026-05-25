"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Lock, Zap, Plus, Search } from 'lucide-react';

const VAULT_ITEMS = [
  { id: 'v1', name: 'Neural Overlord v2', rarity: 'Legendary', type: 'Script Cluster', icon: Zap },
  { id: 'v2', name: 'Stealth Protocol Alpha', rarity: 'Elite', type: 'Security Node', icon: Shield },
];

export default function DashboardVaultPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
               Personal Vault
               <Shield size={32} className="text-cyber-pink" />
            </h1>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Secure storage for high-rarity neural signatures</p>
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
             <input className="bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-[10px] uppercase tracking-widest text-white focus:outline-none focus:border-cyber-pink" placeholder="Scan Vault..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Active Vault Items */}
           {VAULT_ITEMS.map((item) => (
             <GlassCard key={item.id} className="aspect-[3/4] flex flex-col items-center justify-center border-cyber-pink/30 bg-cyber-pink/5 relative group overflow-hidden">
                <div className="absolute top-4 right-4 text-[8px] font-mono text-cyber-pink uppercase font-bold tracking-widest">{item.rarity}</div>
                <div className="w-20 h-20 rounded-full bg-cyber-pink/10 border border-cyber-pink/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <item.icon size={32} className="text-cyber-pink" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">{item.name}</h3>
                <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] mb-8">{item.type}</p>
                <button className="px-6 py-2 bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink text-[10px] font-bold uppercase tracking-widest hover:bg-cyber-pink hover:text-white transition-all rounded">Initialize Access</button>
             </GlassCard>
           ))}

           {/* Empty Slot */}
           <GlassCard className="aspect-[3/4] flex flex-col items-center justify-center border-dashed border-white/10 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Lock size={40} className="text-white/10 mb-6" />
              <h3 className="text-lg font-bold uppercase tracking-tighter text-white/20">Empty Slot 03</h3>
              <p className="text-[8px] text-white/10 uppercase tracking-[0.2em] mt-2">Neural Link Required</p>
              <button className="mt-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-cyber-pink hover:border-cyber-pink/30 transition-all opacity-0 group-hover:opacity-100">
                <Plus size={20} />
              </button>
           </GlassCard>
        </div>

        <div className="mt-20 p-12 glass-panel border border-cyber-pink/20 rounded-2xl flex flex-col md:flex-row items-center gap-12 bg-cyber-pink/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/5 uppercase tracking-[0.4em]">Vault Protocol Level 4</div>
           <div className="w-24 h-24 rounded-full bg-cyber-pink/10 border border-cyber-pink/20 flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(255,0,255,0.1)]">
              <Zap size={40} className="text-cyber-pink" />
           </div>
           <div className="text-center md:text-left">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Secure Neural Storage</h2>
              <p className="text-white/40 text-sm uppercase tracking-widest leading-relaxed max-w-lg">
                 The Personal Vault is reserved for Legendary and Elite tier assets. Once acquired, these assets are cryptographically bound to your neural signature and stored here for instant access across any subspace node.
              </p>
           </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
