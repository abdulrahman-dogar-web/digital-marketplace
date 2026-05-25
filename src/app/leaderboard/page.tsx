"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Trophy, Zap, Crown, ChevronUp } from 'lucide-react';

const LEADERS = [
  { rank: 1, name: 'Admin_Nexus', xp: 25400, level: 124, rank_title: 'Nexus Master', avatar: '👑' },
  { rank: 2, name: 'Cyber_Punk', xp: 18200, level: 82, rank_title: 'Neural Elite', avatar: '🤖' },
  { rank: 3, name: 'Data_Ghost', xp: 15600, level: 75, rank_title: 'Neural Elite', avatar: '👻' },
  { rank: 4, name: 'Neon_Rider', xp: 12100, level: 61, rank_title: 'Cyber Agent', avatar: '🏎️' },
  { rank: 5, name: 'Void_Walker', xp: 9800, level: 49, rank_title: 'Cyber Agent', avatar: '🌌' },
];

export default function LeaderboardPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block p-4 rounded-full bg-cyber-gold/10 mb-6 border border-cyber-gold/20"
          >
            <Trophy size={48} className="text-cyber-gold" />
          </motion.div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Neural Elite</h1>
          <p className="text-white/40 font-mono uppercase tracking-[0.4em] text-xs">Global Nexus Rankings • Updated Hourly</p>
        </div>

        <div className="space-y-4">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-6 mb-12 items-end">
            {/* Rank 2 */}
            <GlassCard className="p-6 text-center order-1 h-[250px] flex flex-col justify-center border-cyber-blue/30 bg-cyber-blue/5">
              <div className="text-3xl mb-2">{LEADERS[1].avatar}</div>
              <div className="text-lg font-bold text-white mb-1">{LEADERS[1].name}</div>
              <div className="text-[10px] text-cyber-blue font-mono uppercase tracking-widest mb-4">Rank #2</div>
              <div className="text-xl font-mono font-bold text-white/90">{LEADERS[1].xp} XP</div>
            </GlassCard>

            {/* Rank 1 */}
            <GlassCard className="p-8 text-center order-2 h-[300px] flex flex-col justify-center border-cyber-gold/50 bg-cyber-gold/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-gold to-transparent" />
              <Crown size={40} className="text-cyber-gold mx-auto mb-4" />
              <div className="text-4xl mb-2">{LEADERS[0].avatar}</div>
              <div className="text-2xl font-black uppercase text-white mb-1">{LEADERS[0].name}</div>
              <div className="text-[10px] text-cyber-gold font-mono uppercase tracking-widest mb-6">Nexus Master</div>
              <div className="text-3xl font-mono font-bold text-cyber-gold">{LEADERS[0].xp} XP</div>
            </GlassCard>

            {/* Rank 3 */}
            <GlassCard className="p-6 text-center order-3 h-[220px] flex flex-col justify-center border-white/10 bg-white/5">
              <div className="text-3xl mb-2">{LEADERS[2].avatar}</div>
              <div className="text-lg font-bold text-white mb-1">{LEADERS[2].name}</div>
              <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-4">Rank #3</div>
              <div className="text-xl font-mono font-bold text-white/90">{LEADERS[2].xp} XP</div>
            </GlassCard>
          </div>

          {/* List View */}
          <div className="space-y-3">
            {LEADERS.slice(3).map((leader) => (
              <GlassCard key={leader.rank} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-8">
                  <div className="w-8 font-mono text-xl font-bold text-white/20 group-hover:text-cyber-blue transition-colors">#{leader.rank}</div>
                  <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xl">{leader.avatar}</div>
                  <div>
                    <div className="font-bold text-white text-lg">{leader.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{leader.rank_title}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-cyber-blue">{leader.xp} XP</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/20 flex items-center justify-end gap-1">
                    Level {leader.level} <ChevronUp size={10} className="text-cyber-green" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mt-20 p-8 glass-panel border border-cyber-blue/20 rounded-lg text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Zap className="text-cyber-blue" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest">How to Rank Up?</h3>
          </div>
          <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
            Acquire neural assets, discover hidden easter eggs, and contribute to the nexus community to earn XP. Elite ranks unlock exclusive vault access and dynamic discounts.
          </p>
        </div>
      </div>
    </GlobalLayout>
  );
}
