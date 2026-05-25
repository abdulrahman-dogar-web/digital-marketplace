"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import {
  Users,
  DollarSign,
  Package,
  CheckCircle,
  XCircle,
  Shield,
  ExternalLink,
  Settings,
  AlertTriangle,
  Gift,
  Layout,
  Database,
  Lock,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const INITIAL_TRANSACTIONS = [
  { id: 'TX-9021', user: 'Neural_Drifter', product: 'AI Agent Script', amount: 29, status: 'pending', method: 'Easypaisa', date: '2025-02-12' },
  { id: 'TX-9022', user: 'Cyber_Punk', product: 'Neural Automation Suite', amount: 299, status: 'approved', method: 'Bank Transfer', date: '2025-02-11' },
  { id: 'TX-9023', user: 'Data_Ghost', product: 'Holographic UI Kit', amount: 89, status: 'rejected', method: 'Binance', date: '2025-02-10' },
];

const INITIAL_PRODUCTS = [
  { id: '1', name: 'Neural Automation Suite', price: 299, seller: 'Admin_Nexus', status: 'approved', rarity: 'Legendary' },
  { id: '2', name: 'Cyber Nexus Prompt Pack', price: 49, seller: 'Operator_X', status: 'approved', rarity: 'Elite' },
  { id: '5', name: 'AI Agent Script', price: 29, seller: 'Data_Ghost', status: 'pending', rarity: 'Common' },
];

export default function AdminDashboard() {
  const [activeSection, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
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

  const handleProductStatus = (id: string, status: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-cyber-purple font-mono text-[10px] uppercase tracking-[0.4em] mb-2 font-bold">Internal Nexus Command</div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-white">Neural Command Center</h1>
          </div>
          <div className="flex gap-4">
            <NeonButton variant="purple" className="px-4 py-2 text-[10px]">Broadcast Alert</NeonButton>
            <NeonButton variant="cyan" className="px-4 py-2 text-[10px]">System Reboot</NeonButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: Layout },
              { id: 'transactions', label: 'Payments', icon: DollarSign },
              { id: 'users', label: 'Citizens', icon: Users },
              { id: 'products', label: 'Assets', icon: Package },
              { id: 'eggs', label: 'Easter Eggs', icon: Gift },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'config', label: 'Config', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeSection === item.id ? "bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-12">
            {activeSection === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Revenue', value: `$${revenue.toLocaleString()}`, icon: DollarSign, color: 'text-cyber-green', progress: '85%' },
                    { label: 'Active Sellers', value: '1,204', icon: Users, color: 'text-cyber-blue', progress: '42%' },
                    { label: 'Total Products', value: products.length.toString(), icon: Package, color: 'text-cyber-purple', progress: '68%' },
                    { label: 'System Load', value: '34%', icon: Database, color: 'text-cyber-gold', progress: '34%' },
                  ].map((stat, i) => (
                    <GlassCard key={i} className="border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">{stat.label}</div>
                          <div className={cn("text-2xl font-mono font-bold", stat.color)}>{stat.value}</div>
                        </div>
                        <stat.icon size={20} className="text-white/20" />
                      </div>
                      <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: stat.progress }} className={cn("h-full", stat.color.replace('text-', 'bg-'))} />
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <GlassCard className="lg:col-span-2 p-0 overflow-hidden border-white/5">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white">Live Purchase Feed</h3>
                      <button onClick={() => setActiveTab('transactions')} className="text-[10px] text-cyber-blue hover:underline uppercase tracking-widest font-bold">Manage All</button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {transactions.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-[10px] font-mono text-white/20">{tx.id}</div>
                            <div>
                              <div className="text-sm font-bold text-white/80">{tx.user}</div>
                              <div className="text-[10px] text-white/40 uppercase font-bold">{tx.product}</div>
                            </div>
                          </div>
                          <div className={cn("text-[10px] font-bold uppercase px-2 py-1 rounded border",
                            tx.status === 'approved' ? 'text-cyber-green border-cyber-green/20' :
                            tx.status === 'rejected' ? 'text-cyber-pink border-cyber-pink/20' : 'text-cyber-gold border-cyber-gold/20'
                          )}>
                            {tx.status}
                          </div>
                        </div>
                      ))}
                    </div>
                   </GlassCard>

                   <GlassCard className="p-6 border-white/5">
                    <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2 font-bold">
                      <Shield size={14} className="text-cyber-pink" />
                      Security Incident Log
                    </h3>
                    <div className="space-y-4 font-mono text-[9px]">
                      {[
                        { time: '14:22:01', msg: 'ADMIN_LOGIN: Success', type: 'success' },
                        { time: '14:18:45', msg: 'VAULT_ACCESS: Attempt logged', type: 'warning' },
                        { time: '13:55:12', msg: 'DDOS_MITIGATED: 192.168.1.1', type: 'error' },
                        { time: '12:10:04', msg: 'EGG_CLAIMED: god_mode', type: 'info' },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/20">[{log.time}]</span>
                          <span className={cn(
                            log.type === 'error' ? 'text-cyber-pink' :
                            log.type === 'warning' ? 'text-cyber-gold' :
                            log.type === 'success' ? 'text-cyber-green' : 'text-cyber-blue'
                          )}>{log.msg}</span>
                        </div>
                      ))}
                    </div>
                   </GlassCard>
                </div>
              </motion.div>
            )}

            {activeSection === 'transactions' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Transaction Vault</h2>
                  <div className="flex gap-4">
                    <select className="bg-white/5 border border-white/10 rounded px-4 py-2 text-[10px] uppercase tracking-widest text-white/60 focus:outline-none font-bold">
                      <option className="bg-cyber-black">All Statuses</option>
                      <option className="bg-cyber-black">Pending</option>
                      <option className="bg-cyber-black">Verified</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <GlassCard key={tx.id} className={cn(
                      "p-6 border-white/5 flex items-center justify-between transition-all",
                      tx.status === 'approved' ? 'border-cyber-green/20 bg-cyber-green/5' :
                      tx.status === 'rejected' ? 'border-cyber-pink/20 bg-cyber-pink/5' : ''
                    )}>
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-white/5 rounded flex flex-col items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors group">
                          <ExternalLink size={20} className="text-white/20 group-hover:text-cyber-blue" />
                          <span className="text-[8px] font-mono mt-1 text-white/40 font-bold">RECEIPT</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-white/90">{tx.user}</span>
                            <span className="text-[10px] text-white/20 font-mono">ID: {tx.id}</span>
                          </div>
                          <div className="text-sm text-cyber-blue font-bold uppercase mt-1">{tx.product}</div>
                          <div className="text-[10px] font-mono text-white/40 uppercase mt-2 font-bold">
                            {tx.method} • <span className="text-white/60">${tx.amount}</span> • {tx.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {tx.status === 'pending' ? (
                          <>
                            <button onClick={() => handleStatusChange(tx.id, 'approved')} className="px-6 py-3 bg-cyber-green/10 text-cyber-green rounded hover:bg-cyber-green/20 transition-all border border-cyber-green/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                              <CheckCircle size={14} /> Approve
                            </button>
                            <button onClick={() => handleStatusChange(tx.id, 'rejected')} className="px-6 py-3 bg-cyber-pink/10 text-cyber-pink rounded hover:bg-cyber-pink/20 transition-all border border-cyber-pink/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                              <XCircle size={14} /> Reject
                            </button>
                          </>
                        ) : (
                          <div className={cn(
                            "px-4 py-2 rounded text-[10px] font-bold uppercase border flex items-center gap-2",
                            tx.status === 'approved' ? 'text-cyber-green border-cyber-green/20 bg-cyber-green/5' : 'text-cyber-pink border-cyber-pink/20 bg-cyber-pink/5'
                          )}>
                            {tx.status === 'approved' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {tx.status}
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'products' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Global Asset Manager</h2>
                  <NeonButton variant="cyan" className="px-6 py-2 text-[10px] flex items-center gap-2">
                    <Plus size={14} /> New Manual Asset
                  </NeonButton>
                </div>

                <GlassCard className="p-0 overflow-hidden border-white/5">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">Seller</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="font-bold text-white/80">{p.name}</div>
                             <div className="text-[8px] text-white/20 uppercase tracking-widest">{p.rarity} node</div>
                          </td>
                          <td className="px-6 py-4 text-white/40 font-bold">{p.seller}</td>
                          <td className="px-6 py-4 text-cyber-blue font-bold">${p.price}</td>
                          <td className="px-6 py-4">
                             <span className={cn(
                               "px-2 py-0.5 rounded text-[8px] font-bold uppercase border",
                               p.status === 'approved' ? 'text-cyber-green border-cyber-green/20' : 'text-cyber-gold border-cyber-gold/20'
                             )}>{p.status}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2">
                                {p.status === 'pending' && (
                                   <button onClick={() => handleProductStatus(p.id, 'approved')} className="p-2 text-cyber-green hover:bg-cyber-green/10 rounded transition-all"><CheckCircle size={14} /></button>
                                )}
                                <button className="p-2 text-white/20 hover:text-cyber-blue rounded transition-all"><Edit size={14} /></button>
                                <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className="p-2 text-white/20 hover:text-cyber-pink rounded transition-all"><Trash2 size={14} /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-white">Neural Shield Control</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassCard className="p-8 border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-pink mb-6 flex items-center gap-2 font-bold">
                      <AlertTriangle size={18} />
                      User Blacklist
                    </h3>
                    <div className="space-y-4 mb-8">
                      {['Dark_Stalker_99', 'Exploit_Node_01'].map((u) => (
                        <div key={u} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                          <span className="text-sm font-mono text-white/80">{u}</span>
                          <button className="text-[10px] text-cyber-blue uppercase font-bold hover:underline">Unban</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-2 text-xs focus:outline-none text-white font-bold" placeholder="Username to restrict..." />
                      <NeonButton variant="pink" className="px-6 py-2 text-[10px]">Ban</NeonButton>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-8 border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-blue mb-6 flex items-center gap-2 font-bold">
                      <Lock size={18} />
                      Access Control
                    </h3>
                    <div className="space-y-6">
                      {[
                        { label: 'Maintenance Mode', status: false },
                        { label: 'Vault Lockdown', status: true },
                        { label: 'New Signups', status: true },
                        { label: 'Real-time Feed', status: true },
                      ].map((opt, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest text-white/60 font-bold">{opt.label}</span>
                          <button className={cn(
                            "w-12 h-6 rounded-full relative transition-all border border-white/10",
                            opt.status ? "bg-cyber-blue" : "bg-white/5"
                          )}>
                            <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-[0_0_5px_rgba(0,0,0,0.5)]", opt.status ? "right-1" : "left-1")} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            )}

            {(['users', 'eggs', 'config'].includes(activeSection)) && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                  <Database size={64} className="text-white/5 mb-6" />
                  <h3 className="text-2xl font-black uppercase text-white/20 tracking-widest">Node Connection Pending</h3>
                  <p className="text-white/10 text-xs uppercase tracking-widest mt-2 max-w-xs">The {activeSection} module is scheduled for decryption in the next maintenance cycle.</p>
               </motion.div>
            )}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
