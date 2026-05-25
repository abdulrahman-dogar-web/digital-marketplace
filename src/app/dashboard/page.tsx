"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Package, Download, Heart, Trophy, Bell, Settings, ArrowUpRight, Zap, Shield, Star, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { cn } from '@/lib/utils';

export default function UserDashboard() {
  const { user } = useUserStore();

  const mockPurchases = [
    { id: '1', name: 'Neural Automation Suite', price: 299, date: '2025-02-10', status: 'delivered' },
    { id: '2', name: 'Cyber Nexus Prompt Pack', price: 49, date: '2025-02-05', status: 'delivered' },
  ];

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <GlassCard className="lg:col-span-1 p-10 text-center flex flex-col items-center bg-white/5">
            <div className="relative w-40 h-40 mb-8">
              <div className="absolute inset-0 bg-cyber-blue/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-full border-4 border-cyber-blue flex items-center justify-center bg-cyber-black text-6xl overflow-hidden shadow-[0_0_40px_rgba(0,242,255,0.3)]">
                {user?.avatar_url ? <img src={user.avatar_url} /> : '👤'}
              </div>
              <div className="absolute -bottom-2 right-4 bg-cyber-blue text-black font-black text-[12px] px-3 py-1 rounded-full shadow-lg">
                LVL {Math.floor((user?.xp || 0) / 100) + 1}
              </div>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">{user?.username || 'Guest_Explorer'}</h2>
            <p className="text-cyber-blue text-[11px] font-black font-mono uppercase tracking-[0.4em] mt-3">{user?.rank || 'Initiate'}</p>

            <div className="w-full mt-10 space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest px-2 font-black">
                <span className="text-white/40">Neural XP</span>
                <span className="text-cyber-blue">{(user?.xp || 0) % 100} / 100</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(user?.xp || 0) % 100}%` }}
                  className="h-full bg-cyber-blue shadow-[0_0_15px_#00f2ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-12">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-center">
                <div className="text-2xl font-black text-white">4</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40 font-black">Badges</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-center">
                <div className="text-2xl font-black text-white">#124</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40 font-black">Rank</div>
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-3 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Bought Products', value: '12', icon: Package, color: 'text-cyber-blue' },
                { label: 'Wishlist Items', value: '45', icon: Heart, color: 'text-cyber-pink' },
                { label: 'Achievements', value: '8/24', icon: Trophy, color: 'text-cyber-gold' },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-8 flex items-center gap-8 bg-white/5 border-white/10 group hover:border-cyber-blue/50 transition-all">
                  <div className={cn("p-4 bg-white/5 rounded-lg transition-transform group-hover:scale-110", stat.color)}>
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">{stat.label}</div>
                    <div className="text-3xl font-mono font-bold text-white">{stat.value}</div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Recent Acquisitions */}
              <GlassCard className="p-0 overflow-hidden border-white/10">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                    <Download size={18} className="text-cyber-blue" />
                    Acquisition Log
                  </h3>
                  <Link href="/dashboard/downloads" className="text-[10px] text-cyber-blue hover:underline uppercase tracking-widest font-black">Transmit All</Link>
                </div>
                <div className="divide-y divide-white/5">
                  {mockPurchases.map((item) => (
                    <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div>
                        <div className="font-black text-white uppercase group-hover:text-cyber-blue transition-colors">{item.name}</div>
                        <div className="text-[10px] text-white/30 font-mono uppercase mt-2">LINK_STABLE • {item.date}</div>
                      </div>
                      <NeonButton onClick={() => alert(`Starting transmission for ${item.name}...`)} variant="cyan" className="px-5 py-2.5 text-[10px] font-black">Initialize</NeonButton>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* System Messages */}
              <GlassCard className="p-0 overflow-hidden border-white/10">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                    <Bell size={18} className="text-cyber-gold" />
                    Nexus Feed
                  </h3>
                </div>
                <div className="p-8 space-y-8">
                  {[
                    { title: 'Achievement Unlocked', message: 'You unlocked "Neural Pioneer" badge.', time: '2h ago', color: 'bg-cyber-gold' },
                    { title: 'Price Drop Alert', message: 'An item in your wishlist is now -20%.', time: '5h ago', color: 'bg-cyber-blue' },
                    { title: 'Protocol Update', message: 'CyberNest V4.2.0 initialized.', time: '1d ago', color: 'bg-cyber-green' },
                  ].map((note, i) => (
                    <div key={i} className="flex gap-5 group cursor-default">
                      <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0 animate-pulse shadow-lg", note.color)} />
                      <div>
                        <div className="text-sm font-black text-white/90 uppercase tracking-tight group-hover:text-white transition-colors">{note.title}</div>
                        <div className="text-xs text-white/40 mt-1 uppercase tracking-widest leading-relaxed">{note.message}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-widest mt-2 font-mono">{note.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { label: 'Vault', icon: Shield, link: '/dashboard/vault' },
            { label: 'Rankings', icon: Zap, link: '/leaderboard' },
            { label: 'Identity', icon: UserIcon, link: '/profile' },
            { label: 'Milestones', icon: Star, link: '/dashboard/achievements' },
            { label: 'Protocol', icon: Settings, link: '/dashboard/settings' },
            { label: 'Support', icon: ArrowUpRight, link: '/support' },
          ].map((item, i) => (
            <Link key={i} href={item.link}>
              <GlassCard className="p-8 text-center hover:border-cyber-blue/50 transition-all group bg-white/5 border-white/10 hover:bg-white/10">
                <item.icon size={32} className="mx-auto mb-6 text-white/20 group-hover:text-cyber-blue transition-all group-hover:scale-110" />
                <div className="text-[11px] uppercase tracking-widest font-black text-white/60 group-hover:text-white transition-colors">{item.label}</div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
}
