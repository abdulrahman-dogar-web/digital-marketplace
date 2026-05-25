"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { BarChart3, Users, DollarSign, Package, CheckCircle, Clock, XCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_TRANSACTIONS = [
  { id: 'TX-9021', user: 'Neural_Drifter', product: 'AI Agent Script', amount: 29, status: 'pending', method: 'Easypaisa' },
  { id: 'TX-9022', user: 'Cyber_Punk', product: 'Neural Automation Suite', amount: 299, status: 'approved', method: 'Bank Transfer' },
  { id: 'TX-9023', user: 'Data_Ghost', product: 'Holographic UI Kit', amount: 89, status: 'rejected', method: 'Binance' },
];

export default function AdminDashboard() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-cyber-purple font-mono text-[10px] uppercase tracking-[0.4em] mb-2">Internal Nexus Command</div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Neural Command Center</h1>
          </div>
          <div className="flex gap-4">
            <NeonButton variant="purple" className="px-4 py-2 text-[10px]">Broadcast Alert</NeonButton>
            <NeonButton variant="cyan" className="px-4 py-2 text-[10px]">System Reboot</NeonButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '$42,920', icon: DollarSign, color: 'text-cyber-green' },
            { label: 'Active Sellers', value: '1,204', icon: Users, color: 'text-cyber-blue' },
            { label: 'Total Products', value: '8,492', icon: Package, color: 'text-cyber-purple' },
            { label: 'Conversion Rate', value: '12.4%', icon: BarChart3, color: 'text-cyber-pink' },
          ].map((stat, i) => (
            <GlassCard key={i} className="border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</div>
                  <div className={cn("text-2xl font-mono font-bold", stat.color)}>{stat.value}</div>
                </div>
                <stat.icon size={20} className="text-white/20" />
              </div>
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  className={cn("h-full", stat.color.replace('text-', 'bg-'))}
                />
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
              <Clock className="text-cyber-gold" size={20} />
              Pending Transactions
            </h2>
            <div className="space-y-4">
              {MOCK_TRANSACTIONS.map((tx) => (
                <GlassCard key={tx.id} className="p-4 border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center text-white/40 font-mono text-xs">
                      IMG
                    </div>
                    <div>
                      <div className="font-bold text-white/90">{tx.user} <span className="text-white/30 font-normal">bought</span> {tx.product}</div>
                      <div className="text-[10px] font-mono text-white/40 uppercase mt-1">
                        ID: {tx.id} • {tx.method} • <span className="text-cyber-blue">${tx.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-cyber-green/10 text-cyber-green rounded hover:bg-cyber-green/20 transition-colors">
                      <CheckCircle size={18} />
                    </button>
                    <button className="p-2 bg-cyber-pink/10 text-cyber-pink rounded hover:bg-cyber-pink/20 transition-colors">
                      <XCircle size={18} />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
              <Shield className="text-cyber-blue" size={20} />
              Nexus Health
            </h2>
            <GlassCard className="space-y-6">
              {[
                { label: 'Database Sync', status: 'Optimal', color: 'text-cyber-green' },
                { label: 'AI Neural Load', status: '34%', color: 'text-cyber-blue' },
                { label: 'Payment Gateway', status: 'Online', color: 'text-cyber-green' },
                { label: 'Lore Decryption', status: 'In Progress', color: 'text-cyber-gold' },
              ].map((sys, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">{sys.label}</span>
                  <span className={cn("font-bold font-mono", sys.color)}>{sys.status}</span>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
