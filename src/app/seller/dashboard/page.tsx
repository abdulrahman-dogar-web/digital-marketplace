"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Plus, Package, MessageSquare, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SellerDashboard() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-2">Operator Portal</div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Asset Management</h1>
          </div>
          <NeonButton variant="cyan" className="px-6 py-3 flex items-center gap-2">
            <Plus size={18} />
            Initialize New Asset
          </NeonButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <GlassCard className="lg:col-span-1 border-cyber-blue/20">
            <div className="text-center py-6">
              <div className="w-24 h-24 rounded-full bg-cyber-blue/10 mx-auto mb-4 border border-cyber-blue/30 flex items-center justify-center overflow-hidden">
                <div className="text-4xl">🤖</div>
              </div>
              <h3 className="text-xl font-bold">Operator_X</h3>
              <p className="text-cyber-blue text-xs font-mono uppercase tracking-widest mt-1">Cyber Agent</p>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest px-4">
                  <span className="text-white/40">XP</span>
                  <span className="text-white/80">1,240 / 2,000</span>
                </div>
                <div className="mx-4 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-blue w-[62%]" />
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 mt-6 pt-6 space-y-1">
              <button className="w-full text-left px-4 py-2 text-sm text-cyber-blue bg-cyber-blue/5 rounded border-l-2 border-cyber-blue">Overview</button>
              <button className="w-full text-left px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors">Products</button>
              <button className="w-full text-left px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors">Earnings</button>
              <button className="w-full text-left px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors">Settings</button>
            </div>
          </GlassCard>

          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Sales', value: '42', icon: TrendingUp },
                { label: 'Active Assets', value: '12', icon: Package },
                { label: 'Unread Intel', value: '3', icon: MessageSquare },
              ].map((stat, i) => (
                <GlassCard key={i} className="flex items-center gap-6">
                  <div className="p-3 bg-white/5 rounded text-cyber-blue">
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
                    <div className="text-2xl font-mono font-bold">{stat.value}</div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-0 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase tracking-widest">Active Assets</h2>
                <span className="text-[10px] text-white/40">TOTAL STORAGE: 1.2 GB / 5 GB</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
                      <th className="px-6 py-4 font-normal">Asset Name</th>
                      <th className="px-6 py-4 font-normal">Rarity</th>
                      <th className="px-6 py-4 font-normal">Price</th>
                      <th className="px-6 py-4 font-normal">Status</th>
                      <th className="px-6 py-4 font-normal text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {[
                      { name: 'Neural Automation Suite', rarity: 'Legendary', price: '$299', status: 'Approved', color: 'text-cyber-green' },
                      { name: 'Cyber Nexus Prompt Pack', rarity: 'Elite', price: '$49', status: 'Approved', color: 'text-cyber-green' },
                      { name: 'Nexus Security Suite', rarity: 'Legendary', price: '$199', status: 'Pending', color: 'text-cyber-gold' },
                    ].map((asset, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold">{asset.name}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 uppercase",
                            asset.rarity === 'Legendary' ? 'text-rarity-legendary border-rarity-legendary/20' : 'text-rarity-elite border-rarity-elite/20'
                          )}>
                            {asset.rarity}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono">{asset.price}</td>
                        <td className="px-6 py-4">
                          <span className={cn("flex items-center gap-2", asset.color)}>
                            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", asset.color.replace('text-', 'bg-'))} />
                            {asset.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-white/40 hover:text-cyber-blue transition-colors px-2">Edit</button>
                          <button className="text-white/40 hover:text-cyber-pink transition-colors px-2">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
