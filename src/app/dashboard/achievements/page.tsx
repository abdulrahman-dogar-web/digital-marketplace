"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Trophy, Star, Zap, Lock, Shield, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const ACHIEVEMENTS = [
  { id: 1, name: 'Neural Pioneer', desc: 'First asset acquisition successful.', xp: 100, earned: true, icon: Zap },
  { id: 2, name: 'Archive Crawler', desc: 'Unlocked 5 classified lore files.', xp: 250, earned: true, icon: Database },
  { id: 3, name: 'Vault Breaker', desc: 'Gained entry to the Hidden Vault.', xp: 500, earned: false, icon: Lock },
  { id: 4, name: 'Nexus Council', desc: 'Achieved Nexus Master rank.', xp: 1000, earned: false, icon: Shield },
  { id: 5, name: 'Egg Hunter', desc: 'Discovered a hidden Sunday Special.', xp: 2000, earned: false, icon: Star },
];

export default function AchievementsPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="text-center mb-20">
           <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="inline-block p-4 rounded-full bg-cyber-gold/10 border border-cyber-gold/20 mb-8">
              <Trophy size={48} className="text-cyber-gold" />
           </motion.div>
           <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Neural Milestones</h1>
           <p className="text-white/40 leading-relaxed uppercase text-[10px] tracking-[0.3em]">Mapping your progression through the digital civilization.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {ACHIEVEMENTS.map((a) => (
              <GlassCard key={a.id} className={cn(
                 "p-8 text-center flex flex-col items-center group transition-all duration-500",
                 !a.earned && "opacity-40 grayscale blur-[1px]"
              )}>
                 <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center border-2 mb-6 transition-all duration-500 group-hover:scale-110",
                    a.earned ? "bg-cyber-gold/10 border-cyber-gold/40 text-cyber-gold shadow-[0_0_20px_rgba(255,215,0,0.2)]" : "bg-white/5 border-white/10 text-white/20"
                 )}>
                    <a.icon size={28} />
                 </div>
                 <h3 className="font-bold uppercase tracking-widest text-white mb-2">{a.name}</h3>
                 <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed mb-6">{a.desc}</p>

                 <div className="mt-auto pt-6 border-t border-white/5 w-full">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                       <span className="text-white/20">REWARD:</span>
                       <span className="text-cyber-blue font-bold">{a.xp} XP</span>
                    </div>
                    {!a.earned && (
                       <div className="mt-4 px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] text-white/30 uppercase font-bold tracking-widest">Locked Node</div>
                    )}
                 </div>
              </GlassCard>
           ))}
        </div>

        <div className="mt-20 p-10 glass-panel border border-cyber-blue/20 bg-cyber-blue/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <Cpu className="text-cyber-blue" size={40} />
              <div className="text-left">
                 <h3 className="font-black uppercase tracking-widest text-white text-xl">Nexus Completion</h3>
                 <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">2 of 5 protocols initialized</p>
              </div>
           </div>
           <div className="w-full md:w-64 h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="h-full bg-cyber-blue shadow-[0_0_15px_#00f2ff]" />
           </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

import { cn } from '@/lib/utils';
