"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Plus,
  Search,
  Globe,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
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

const INITIAL_USERS = [
  { id: 'u1', username: 'Admin_Nexus', email: 'admin@cybernest.io', role: 'admin', rank: 'Nexus Master', xp: 25400, status: 'active' },
  { id: 'u2', username: 'Operator_X', email: 'seller@cybernest.io', role: 'seller', rank: 'Cyber Agent', xp: 1240, status: 'active' },
  { id: 'u3', username: 'Dark_Stalker_99', email: 'stalk@void.net', role: 'user', rank: 'Explorer', xp: 45, status: 'restricted' },
];

export default function AdminDashboard() {
  const [activeSection, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [revenue, setRevenue] = useState(42920);

  // Platform Config
  const [platformConfig, setPlatformConfig] = useState({
    name: 'CyberNest',
    logo: 'N',
    whatsapp: '+923001412943',
    commission: 15,
    status: 'Operational'
  });

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

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'restricted' : 'active' } : u));
  };

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-cyber-purple/10 border border-cyber-purple/30 rounded flex items-center justify-center text-cyber-purple text-3xl font-black shadow-[0_0_30px_rgba(188,19,254,0.2)]">
                {platformConfig.logo}
             </div>
             <div>
               <div className="text-cyber-purple font-mono text-[10px] uppercase tracking-[0.4em] mb-2 font-bold">Internal Nexus Command</div>
               <h1 className="text-5xl font-black uppercase tracking-tighter text-white">{platformConfig.name} Master Control</h1>
             </div>
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
              { id: 'config', label: 'Platform Config', icon: Settings },
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

          <div className="lg:col-span-5 space-y-12 min-h-[600px]">
            <AnimatePresence mode="wait">

            {activeSection === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
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
              <motion.div key="transactions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Transaction Vault</h2>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                      <input className="bg-white/5 border border-white/10 rounded pl-10 pr-4 py-2 text-[10px] uppercase tracking-widest text-white focus:outline-none focus:border-cyber-blue" placeholder="Filter IDs..." />
                    </div>
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

            {activeSection === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                 <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Citizen Registry</h2>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 border border-cyber-blue/30 text-cyber-blue text-[10px] font-bold uppercase rounded hover:bg-cyber-blue/10 transition-all">Export Node Data</button>
                  </div>
                </div>

                <GlassCard className="p-0 overflow-hidden border-white/5">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4">Citizen</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                       {users.map((u) => (
                         <tr key={u.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                               <div className="font-bold text-white/80">{u.username}</div>
                               <div className="text-[8px] text-white/20 uppercase">{u.email}</div>
                            </td>
                            <td className="px-6 py-4">
                               <span className={cn(
                                  "px-2 py-0.5 rounded text-[8px] font-bold uppercase border",
                                  u.status === 'active' ? 'text-cyber-green border-cyber-green/20' : 'text-cyber-pink border-cyber-pink/20'
                               )}>{u.status}</span>
                            </td>
                            <td className="px-6 py-4 text-white/40 uppercase font-bold">{u.role}</td>
                            <td className="px-6 py-4 text-right">
                               <div className="flex justify-end gap-2">
                                  <button onClick={() => toggleUserStatus(u.id)} className="p-2 text-white/20 hover:text-cyber-gold rounded transition-all">
                                     <Shield size={14} />
                                  </button>
                                  <button className="p-2 text-white/20 hover:text-cyber-pink rounded transition-all">
                                     <Trash2 size={14} />
                                  </button>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>
            )}

            {activeSection === 'products' && (
              <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Global Asset Manager</h2>
                  <NeonButton variant="cyan" className="px-6 py-2 text-[10px] flex items-center gap-2">
                    <Plus size={14} /> Initialize New Asset
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

            {activeSection === 'config' && (
              <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Platform Configuration</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="p-8">
                       <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-blue mb-6 flex items-center gap-2">
                          <Globe size={18} /> Identity Settings
                       </h3>
                       <div className="space-y-6">
                          <div>
                             <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Platform Name</label>
                             <input
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue"
                                value={platformConfig.name}
                                onChange={(e) => setPlatformConfig({...platformConfig, name: e.target.value})}
                             />
                          </div>
                          <div>
                             <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Logo Initial</label>
                             <input
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue"
                                value={platformConfig.logo}
                                maxLength={1}
                                onChange={(e) => setPlatformConfig({...platformConfig, logo: e.target.value})}
                             />
                          </div>
                       </div>
                    </GlassCard>

                    <GlassCard className="p-8">
                       <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-green mb-6 flex items-center gap-2">
                          <MessageCircle size={18} /> Support Node
                       </h3>
                       <div className="space-y-6">
                          <div>
                             <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">WhatsApp Support Number</label>
                             <input
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-cyber-green"
                                value={platformConfig.whatsapp}
                                onChange={(e) => setPlatformConfig({...platformConfig, whatsapp: e.target.value})}
                             />
                          </div>
                          <div>
                             <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Protocol Status</label>
                             <div className="flex items-center gap-3 p-3 bg-cyber-green/5 border border-cyber-green/20 rounded">
                                <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                                <span className="text-xs text-cyber-green font-bold uppercase tracking-widest">{platformConfig.status}</span>
                             </div>
                          </div>
                       </div>
                    </GlassCard>

                    <GlassCard className="p-8 md:col-span-2">
                       <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-purple mb-6 flex items-center gap-2">
                          <DollarSign size={18} /> Economic Rules
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                                <span className="text-white/40">Nexus Protocol Fee (Commission)</span>
                                <span className="text-cyber-purple">{platformConfig.commission}%</span>
                             </div>
                             <input
                                type="range" min="0" max="100"
                                className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyber-purple"
                                value={platformConfig.commission}
                                onChange={(e) => setPlatformConfig({...platformConfig, commission: parseInt(e.target.value)})}
                             />
                             <p className="text-[8px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                                This fee is automatically deducted from every successful asset acquisition within the nexus.
                             </p>
                          </div>
                          <div className="flex items-end">
                             <NeonButton variant="purple" className="w-full py-4 text-xs">Commit Global Rules</NeonButton>
                          </div>
                       </div>
                    </GlassCard>
                 </div>
              </motion.div>
            )}

            {activeSection === 'eggs' && (
              <motion.div key="eggs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Easter Egg Management</h2>
                    <NeonButton variant="cyan" className="px-6 py-2 text-[10px] flex items-center gap-2">
                      <Plus size={14} /> New Secret Phrase
                    </NeonButton>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                       { code: 'god_mode', reward: '500 XP', claimed: 12, rarity: 'Legendary' },
                       { code: 'nexus_override', reward: 'Elite Badge', claimed: 4, rarity: 'Elite' },
                       { code: 'cyber_sunday', reward: '100% Discount', claimed: 0, rarity: 'Legendary' },
                    ].map((egg, i) => (
                       <GlassCard key={i} className="p-6 relative group border-white/10 hover:border-cyber-blue/30 transition-all">
                          <div className="absolute top-4 right-4"><Gift size={16} className="text-white/20 group-hover:text-cyber-blue" /></div>
                          <div className="text-[8px] font-mono text-white/20 mb-1 uppercase tracking-widest">{egg.rarity} Secret</div>
                          <h3 className="text-xl font-black text-cyber-blue mb-4 font-mono">{egg.code}</h3>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                <span>Reward</span>
                                <span className="text-white/80">{egg.reward}</span>
                             </div>
                             <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                <span>Discoveries</span>
                                <span className="text-white/80">{egg.claimed}</span>
                             </div>
                          </div>
                       </GlassCard>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-white">Neural Shield Control</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassCard className="p-8 border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-pink mb-6 flex items-center gap-2 font-bold">
                      <AlertTriangle size={18} />
                      User Blacklist
                    </h3>
                    <div className="space-y-4 mb-8">
                      {users.filter(u => u.status === 'restricted').map((u) => (
                        <div key={u.id} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                          <span className="text-sm font-mono text-white/80">{u.username}</span>
                          <button onClick={() => toggleUserStatus(u.id)} className="text-[10px] text-cyber-blue uppercase font-bold hover:underline">Restore Node</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-2 text-xs focus:outline-none text-white font-bold" placeholder="Username to restrict..." />
                      <NeonButton variant="pink" className="px-6 py-2 text-[10px]">Ban Node</NeonButton>
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
                            opt.status ? "bg-cyber-blue shadow-[0_0_10px_#00f2ff]" : "bg-white/5"
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

            </AnimatePresence>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
