"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Settings, User, Shield, Bell, Database, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="mb-16">
           <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
              Node Configuration
              <Settings size={32} className="text-white/20" />
           </h1>
           <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Calibrating neural interface & security protocols</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <aside className="lg:col-span-1 space-y-2">
              {[
                 { label: 'Profile Identity', icon: User, active: true },
                 { label: 'Neural Security', icon: Shield, active: false },
                 { label: 'Transmission Prefs', icon: Bell, active: false },
                 { label: 'Data Governance', icon: Database, active: false },
              ].map((item, i) => (
                 <button key={i} className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded text-[10px] font-bold uppercase tracking-widest transition-all",
                    item.active ? "bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20" : "text-white/30 hover:text-white hover:bg-white/5"
                 )}>
                    <item.icon size={16} />
                    {item.label}
                 </button>
              ))}
           </aside>

           <div className="lg:col-span-2 space-y-8">
              <GlassCard className="p-8">
                 <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                    <User size={18} className="text-cyber-blue" />
                    Identity Parameters
                 </h2>
                 <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                          <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Neural Tag (Username)</label>
                          <input className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50" defaultValue="Neural_Drifter" />
                       </div>
                       <div>
                          <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Subspace Freq (Email)</label>
                          <input className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50" defaultValue="drifter@nexus.io" />
                       </div>
                    </div>
                    <div>
                       <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Biography (Encoded in Lore)</label>
                       <textarea className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50" rows={3} defaultValue="Pioneer of the early neural collapse. Specializing in autonomous data recovery." />
                    </div>
                    <div className="pt-4">
                       <NeonButton variant="cyan" className="px-8 py-3 text-[10px]">Update Profile</NeonButton>
                    </div>
                 </form>
              </GlassCard>

              <GlassCard className="p-8 border-cyber-pink/20 bg-cyber-pink/5">
                 <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-3 text-cyber-pink">
                    <Key size={18} />
                    Neural Termination
                 </h2>
                 <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed mb-8">
                    Deleting your node is permanent. All acquired assets, XP, and rank achievements will be scrubbed from the global nexus and cannot be recovered.
                 </p>
                 <button className="px-6 py-3 border border-cyber-pink/30 text-cyber-pink text-[10px] font-bold uppercase tracking-widest hover:bg-cyber-pink hover:text-white transition-all">Request Node Purge</button>
              </GlassCard>
           </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

import { cn } from '@/lib/utils';
