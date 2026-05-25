"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Package, Download, Heart, Trophy, Bell, Settings, ArrowUpRight, Zap, Shield, Star, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <GlassCard className="lg:col-span-1 p-8 text-center flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-cyber-blue/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-full border-2 border-cyber-blue/50 flex items-center justify-center bg-cyber-black text-4xl overflow-hidden">
                {user?.avatar_url ? <img src={user.avatar_url} /> : '👤'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-cyber-blue text-black font-bold text-[10px] px-2 py-1 rounded">
                LVL {Math.floor((user?.xp || 0) / 100) + 1}
              </div>
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter">{user?.username || 'Guest_Explorer'}</h2>
            <p className="text-cyber-blue text-[10px] font-mono uppercase tracking-[0.3em] mt-2">{user?.rank || 'Initiate'}</p>

            <div className="w-full mt-8 space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest px-2">
                <span className="text-white/40">Neural XP</span>
                <span className="text-cyber-blue">{(user?.xp || 0) % 100} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(user?.xp || 0) % 100}%` }}
                  className="h-full bg-cyber-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-10">
              <div className="p-3 bg-white/5 rounded text-center">
                <div className="text-xl font-bold text-white">4</div>
                <div className="text-[8px] uppercase tracking-widest text-white/40">Badges</div>
              </div>
              <div className="p-3 bg-white/5 rounded text-center">
                <div className="text-xl font-bold text-white">#124</div>
                <div className="text-[8px] uppercase tracking-widest text-white/40">Rank</div>
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Bought Products', value: '12', icon: Package, color: 'text-cyber-blue' },
                { label: 'Wishlist Items', value: '45', icon: Heart, color: 'text-cyber-pink' },
                { label: 'Achievements', value: '8/24', icon: Trophy, color: 'text-cyber-gold' },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-6 flex items-center gap-6">
                  <div className={cn("p-3 bg-white/5 rounded", stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
                    <div className="text-2xl font-mono font-bold">{stat.value}</div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Acquisitions */}
              <GlassCard className="p-0 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Download size={16} className="text-cyber-blue" />
                    Recent Acquisitions
                  </h3>
                  <Link href="/dashboard/downloads" className="text-[10px] text-cyber-blue hover:underline uppercase tracking-widest">View All</Link>
                </div>
                <div className="divide-y divide-white/5">
                  {mockPurchases.map((item) => (
                    <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div>
                        <div className="font-bold text-white group-hover:text-cyber-blue transition-colors">{item.name}</div>
                        <div className="text-[10px] text-white/40 font-mono uppercase mt-1">Acquired on {item.date}</div>
                      </div>
                      <NeonButton variant="cyan" className="px-4 py-2 text-[10px]">Download</NeonButton>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* System Messages */}
              <GlassCard className="p-0 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Bell size={16} className="text-cyber-gold" />
                    Nexus Alerts
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  {[
                    { title: 'New Achievement!', message: 'You unlocked "Neural Pioneer" badge.', time: '2h ago' },
                    { title: 'Price Drop', message: 'An item in your wishlist is now -20%.', time: '5h ago' },
                    { title: 'System Update', message: 'CyberNest V4.2.0 protocol initialized.', time: '1d ago' },
                  ].map((note, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue mt-1.5 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-white/90">{note.title}</div>
                        <div className="text-xs text-white/60 mt-0.5">{note.message}</div>
                        <div className="text-[8px] text-white/20 uppercase tracking-widest mt-1">{note.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: 'Vault', icon: Shield, link: '/dashboard/vault' },
            { label: 'XP Rank', icon: Zap, link: '/leaderboard' },
            { label: 'Profile', icon: UserIcon, link: '/profile' },
            { label: 'Achievements', icon: Star, link: '/dashboard/achievements' },
            { label: 'Settings', icon: Settings, link: '/dashboard/settings' },
            { label: 'Support', icon: ArrowUpRight, link: '/support' },
          ].map((item, i) => (
            <Link key={i} href={item.link}>
              <GlassCard className="p-6 text-center hover:border-cyber-blue/50 transition-all group">
                <item.icon size={24} className="mx-auto mb-4 text-white/40 group-hover:text-cyber-blue transition-colors" />
                <div className="text-[10px] uppercase tracking-widest font-bold">{item.label}</div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
}

import { cn } from '@/lib/utils';
