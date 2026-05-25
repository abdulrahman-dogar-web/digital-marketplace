"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { BarChart3, Users, DollarSign, Package, CheckCircle, Clock, XCircle, Shield, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const INITIAL_TRANSACTIONS = [
  { id: 'TX-9021', user: 'Neural_Drifter', product: 'AI Agent Script', amount: 29, status: 'pending', method: 'Easypaisa', date: '2025-02-12' },
  { id: 'TX-9022', user: 'Cyber_Punk', product: 'Neural Automation Suite', amount: 299, status: 'approved', method: 'Bank Transfer', date: '2025-02-11' },
  { id: 'TX-9023', user: 'Data_Ghost', product: 'Holographic UI Kit', amount: 89, status: 'rejected', method: 'Binance', date: '2025-02-10' },
];

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [revenue, setRevenue] = useState(42920);

  const handleStatusChange = (id: string, newStatus: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        if (newStatus === 'approved' && tx.status !== 'approved') {
          setRevenue(prevRev => prevRev + tx.amount);
        }
        return { ...tx, status: newStatus };
      }
      return tx;
    }));
  };

  const pendingCount = transactions.filter(t => t.status === 'pending').length;

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
            { label: 'Total Revenue', value: `$${revenue.toLocaleString()}`, icon: DollarSign, color: 'text-cyber-green', progress: '85%' },
            { label: 'Active Sellers', value: '1,204', icon: Users, color: 'text-cyber-blue', progress: '42%' },
            { label: 'Total Products', value: '8,492', icon: Package, color: 'text-cyber-purple', progress: '68%' },
            { label: 'Conversion Rate', value: '12.4%', icon: BarChart3, color: 'text-cyber-pink', progress: '24%' },
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
                  animate={{ width: stat.progress }}
                  className={cn("h-full", stat.color.replace('text-', 'bg-'))}
                />
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                <Clock className="text-cyber-gold" size={20} />
                Transaction Vault
              </h2>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{pendingCount} Action Required</span>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {transactions.map((tx) => (
                  <motion.div
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <GlassCard className={cn(
                      "p-4 border-white/5 flex items-center justify-between transition-colors",
                      tx.status === 'approved' ? 'border-cyber-green/20 bg-cyber-green/5' :
                      tx.status === 'rejected' ? 'border-cyber-pink/20 bg-cyber-pink/5' : ''
                    )}>
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/5 rounded flex flex-col items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors group">
                          <ExternalLink size={14} className="text-white/20 group-hover:text-cyber-blue" />
                          <span className="text-[8px] font-mono mt-1 text-white/40">PROOF</span>
                        </div>
                        <div>
                          <div className="font-bold text-white/90">
                            {tx.user} <span className="text-white/30 font-normal">acquired</span> {tx.product}
                          </div>
                          <div className="text-[10px] font-mono text-white/40 uppercase mt-1">
                            ID: {tx.id} • {tx.method} • <span className="text-cyber-blue">${tx.amount}</span> • {tx.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {tx.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleStatusChange(tx.id, 'approved')}
                              className="p-2 bg-cyber-green/10 text-cyber-green rounded hover:bg-cyber-green/20 transition-colors border border-cyber-green/20"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(tx.id, 'rejected')}
                              className="p-2 bg-cyber-pink/10 text-cyber-pink rounded hover:bg-cyber-pink/20 transition-colors border border-cyber-pink/20"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        ) : (
                          <div className={cn(
                            "px-3 py-1 rounded text-[10px] font-bold uppercase border",
                            tx.status === 'approved' ? 'text-cyber-green border-cyber-green/20' : 'text-cyber-pink border-cyber-pink/20'
                          )}>
                            {tx.status}
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
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

              <div className="pt-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Security Logs</div>
                <div className="space-y-2 font-mono text-[9px] text-white/30">
                  <div className="flex justify-between"><span>[14:22:01] LOGIN_SUCCESS: Admin_Nexus</span><span className="text-cyber-green">OK</span></div>
                  <div className="flex justify-between"><span>[14:18:45] TX_INITIALIZED: TX-9024</span><span className="text-cyber-blue">WAIT</span></div>
                  <div className="flex justify-between"><span>[13:55:12] DDOS_MITIGATED: 192.168.1.1</span><span className="text-cyber-pink">BLOCK</span></div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
