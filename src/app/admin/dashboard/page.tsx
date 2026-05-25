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
  MessageCircle,
  X
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

const INITIAL_EGGS = [
  { id: 1, code: 'god_mode', reward: '500 XP', claimed: 12, rarity: 'Legendary' },
  { id: 2, code: 'nexus_override', reward: 'Elite Badge', claimed: 4, rarity: 'Elite' },
  { id: 3, code: 'cyber_sunday', reward: '100% Discount', claimed: 0, rarity: 'Legendary' },
];

export default function AdminDashboard() {
  const [activeSection, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [eggs, setEggs] = useState(INITIAL_EGGS);
  const [revenue, setRevenue] = useState(42920);

  const [userSearch, setUserUserSearch] = useState('');
  const [isEggModalOpen, setIsEggModalOpen] = useState(false);
  const [newEgg, setNewEgg] = useState({ code: '', reward: '', rarity: 'Common' });

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

  const handleCreateEgg = (e: React.FormEvent) => {
    e.preventDefault();
    setEggs(prev => [...prev, { id: Date.now(), ...newEgg, claimed: 0 }]);
    setIsEggModalOpen(false);
    setNewEgg({ code: '', reward: '', rarity: 'Common' });
  };

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-cyber-purple/10 border-2 border-cyber-purple rounded-xl flex items-center justify-center text-cyber-purple text-3xl font-black shadow-[0_0_30px_rgba(188,19,254,0.3)]">
                {platformConfig.logo}
             </div>
             <div>
               <div className="text-cyber-purple font-mono text-[10px] uppercase tracking-[0.4em] mb-2 font-black">Internal Nexus Command</div>
               <h1 className="text-5xl font-black uppercase tracking-tighter text-white">{platformConfig.name} Master Control</h1>
             </div>
          </div>
          <div className="flex gap-4">
            <NeonButton onClick={() => alert("Broadcasting global alert sequence...")} variant="purple" className="px-6 py-3 text-[10px]">Broadcast Alert</NeonButton>
            <NeonButton onClick={() => window.location.reload()} variant="cyan" className="px-6 py-3 text-[10px]">System Reboot</NeonButton>
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
                  "w-full flex items-center gap-3 px-4 py-4 rounded text-[10px] font-black uppercase tracking-widest transition-all",
                  activeSection === item.id ? "bg-cyber-purple text-white shadow-[0_0_20px_#bc13fe]" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} />
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
                    <GlassCard key={i} className="border-white/10 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-black">{stat.label}</div>
                          <div className={cn("text-3xl font-mono font-bold", stat.color)}>{stat.value}</div>
                        </div>
                        <div className={cn("p-2 rounded bg-white/5", stat.color)}>
                           <stat.icon size={24} />
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: stat.progress }} className={cn("h-full", stat.color.replace('text-', 'bg-'))} />
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <GlassCard className="lg:col-span-2 p-0 overflow-hidden border-white/10">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">Live Purchase Feed</h3>
                      <button onClick={() => setActiveTab('transactions')} className="text-[10px] text-cyber-blue hover:underline uppercase tracking-widest font-black">Manage All</button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {transactions.slice(0, 5).map((tx) => (
                        <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-1 rounded">{tx.id}</div>
                            <div>
                              <div className="text-sm font-black text-white/90 uppercase">{tx.user}</div>
                              <div className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">{tx.product}</div>
                            </div>
                          </div>
                          <div className={cn("text-[10px] font-black uppercase px-3 py-1.5 rounded-full border-2",
                            tx.status === 'approved' ? 'text-cyber-green border-cyber-green/20 bg-cyber-green/5' :
                            tx.status === 'rejected' ? 'text-cyber-pink border-cyber-pink/20 bg-cyber-pink/5' : 'text-cyber-gold border-cyber-gold/20 bg-cyber-gold/5'
                          )}>
                            {tx.status}
                          </div>
                        </div>
                      ))}
                    </div>
                   </GlassCard>

                   <GlassCard className="p-8 border-white/10 bg-cyber-pink/5">
                    <h3 className="text-[11px] uppercase tracking-widest text-cyber-pink mb-8 flex items-center gap-3 font-black">
                      <Shield size={18} className="text-cyber-pink" />
                      Neural Shield Logs
                    </h3>
                    <div className="space-y-5 font-mono text-[10px]">
                      {[
                        { time: '14:22:01', msg: 'ADMIN_LOGIN: Success', type: 'success' },
                        { time: '14:18:45', msg: 'VAULT_ACCESS: Attempt logged', type: 'warning' },
                        { time: '13:55:12', msg: 'DDOS_MITIGATED: 192.168.1.1', type: 'error' },
                        { time: '12:10:04', msg: 'EGG_CLAIMED: god_mode', type: 'info' },
                        { time: '11:05:33', msg: 'ASSET_UPLOAD: Restricted node', type: 'error' },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-3 last:border-0">
                          <span className="text-white/20">[{log.time}]</span>
                          <span className={cn(
                            "font-bold",
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
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                      <input className="bg-white/5 border border-white/10 rounded-sm pl-10 pr-6 py-3 text-[10px] uppercase tracking-widest text-white focus:outline-none focus:border-cyber-blue w-64" placeholder="Filter IDs..." />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <GlassCard key={tx.id} className={cn(
                      "p-8 border-white/10 flex items-center justify-between transition-all group",
                      tx.status === 'approved' ? 'border-cyber-green/30 bg-cyber-green/5' :
                      tx.status === 'rejected' ? 'border-cyber-pink/30 bg-cyber-pink/5' : ''
                    )}>
                      <div className="flex items-center gap-10">
                        <div
                           onClick={() => alert(`Opening receipt for ${tx.id}...`)}
                           className="w-20 h-20 bg-white/5 rounded-lg flex flex-col items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 hover:border-cyber-blue transition-all group shadow-lg"
                        >
                          <ExternalLink size={24} className="text-white/20 group-hover:text-cyber-blue mb-1" />
                          <span className="text-[9px] font-black mt-1 text-white/40 font-mono">RECEIPT</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-black text-white/90 uppercase tracking-tighter">{tx.user}</span>
                            <span className="text-[10px] text-white/30 font-mono bg-white/5 px-2 py-0.5 rounded">ID: {tx.id}</span>
                          </div>
                          <div className="text-sm text-cyber-blue font-black uppercase mt-1 tracking-widest">{tx.product}</div>
                          <div className="text-[10px] font-mono text-white/40 uppercase mt-3 font-black flex gap-4">
                            <span>METHOD: {tx.method}</span>
                            <span className="text-white/60">AMOUNT: ${tx.amount}</span>
                            <span>DATE: {tx.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        {tx.status === 'pending' ? (
                          <>
                            <NeonButton onClick={() => handleStatusChange(tx.id, 'approved')} variant="cyan" className="px-8 py-3 text-[10px] flex items-center gap-2">
                              <CheckCircle size={14} /> Approve
                            </NeonButton>
                            <NeonButton onClick={() => handleStatusChange(tx.id, 'rejected')} variant="pink" className="px-8 py-3 text-[10px] flex items-center gap-2">
                              <XCircle size={14} /> Reject
                            </NeonButton>
                          </>
                        ) : (
                          <div className={cn(
                            "px-6 py-3 rounded text-[10px] font-black uppercase border-2 flex items-center gap-2",
                            tx.status === 'approved' ? 'text-cyber-green border-cyber-green/40 bg-cyber-green/10' : 'text-cyber-pink border-cyber-pink/40 bg-cyber-pink/10'
                          )}>
                            {tx.status === 'approved' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            {tx.status.toUpperCase()}
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
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                      <input
                        value={userSearch}
                        onChange={(e) => setUserUserSearch(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-sm pl-10 pr-6 py-3 text-[10px] uppercase tracking-widest text-white focus:outline-none focus:border-cyber-blue w-64"
                        placeholder="Search Citizens..."
                      />
                    </div>
                    <button className="px-6 py-2 border-2 border-cyber-blue text-cyber-blue text-[10px] font-black uppercase rounded hover:bg-cyber-blue hover:text-black transition-all">Export Data</button>
                  </div>
                </div>

                <GlassCard className="p-0 overflow-hidden border-white/10">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 bg-white/5">
                        <th className="px-8 py-5">Citizen</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">Role</th>
                        <th className="px-8 py-5">Rank</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                       {users.filter(u => u.username.toLowerCase().includes(userSearch.toLowerCase())).map((u) => (
                         <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-8 py-5">
                               <div className="font-black text-white/90 text-sm uppercase">{u.username}</div>
                               <div className="text-[9px] text-white/30 uppercase font-bold tracking-tighter">{u.email}</div>
                            </td>
                            <td className="px-8 py-5">
                               <span className={cn(
                                  "px-3 py-1 rounded text-[9px] font-black uppercase border-2",
                                  u.status === 'active' ? 'text-cyber-green border-cyber-green/20 bg-cyber-green/5' : 'text-cyber-pink border-cyber-pink/20 bg-cyber-pink/5'
                               )}>{u.status}</span>
                            </td>
                            <td className="px-8 py-5 text-white/60 uppercase font-black">{u.role}</td>
                            <td className="px-8 py-5 text-cyber-blue uppercase font-black">{u.rank}</td>
                            <td className="px-8 py-5 text-right">
                               <div className="flex justify-end gap-3">
                                  <button onClick={() => toggleUserStatus(u.id)} className="p-2.5 text-white/30 hover:text-cyber-gold hover:bg-white/5 rounded transition-all">
                                     <Shield size={18} />
                                  </button>
                                  <button onClick={() => alert(`Editing profile for ${u.username}...`)} className="p-2.5 text-white/30 hover:text-cyber-blue hover:bg-white/5 rounded transition-all">
                                     <Edit size={18} />
                                  </button>
                                  <button onClick={() => setUsers(users.filter(x => x.id !== u.id))} className="p-2.5 text-white/30 hover:text-cyber-pink hover:bg-white/5 rounded transition-all">
                                     <Trash2 size={18} />
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
                  <NeonButton onClick={() => alert("Redirecting to asset initialization flow...")} variant="cyan" className="px-8 py-3 text-[10px] flex items-center gap-3">
                    <Plus size={16} /> Initialize New Asset
                  </NeonButton>
                </div>

                <GlassCard className="p-0 overflow-hidden border-white/10">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 bg-white/5">
                        <th className="px-8 py-5">Product Name</th>
                        <th className="px-8 py-5">Seller</th>
                        <th className="px-8 py-5">Price</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-5">
                             <div className="font-black text-white/90 text-sm uppercase">{p.name}</div>
                             <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{p.rarity} node</div>
                          </td>
                          <td className="px-8 py-5 text-white/60 font-black uppercase">{p.seller}</td>
                          <td className="px-8 py-5 text-cyber-blue font-black">${p.price}</td>
                          <td className="px-8 py-5">
                             <span className={cn(
                               "px-3 py-1 rounded text-[9px] font-black uppercase border-2",
                               p.status === 'approved' ? 'text-cyber-green border-cyber-green/20 bg-cyber-green/5' : 'text-cyber-gold border-cyber-gold/20 bg-cyber-gold/5'
                             )}>{p.status}</span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end gap-3">
                                {p.status === 'pending' && (
                                   <button onClick={() => handleProductStatus(p.id, 'approved')} className="p-2.5 text-cyber-green hover:bg-white/5 rounded transition-all"><CheckCircle size={18} /></button>
                                )}
                                <button onClick={() => alert(`Editing product metadata for ID: ${p.id}...`)} className="p-2.5 text-white/30 hover:text-cyber-blue hover:bg-white/5 rounded transition-all"><Edit size={18} /></button>
                                <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className="p-2.5 text-white/30 hover:text-cyber-pink hover:bg-white/5 rounded transition-all"><Trash2 size={18} /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>
            )}

            {activeSection === 'config' && (activeSection === 'config') && (
              <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Platform Configuration</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="p-10 border-white/10">
                       <h3 className="text-sm font-black uppercase tracking-widest text-cyber-blue mb-8 flex items-center gap-3">
                          <Globe size={22} /> Identity Settings
                       </h3>
                       <div className="space-y-8">
                          <div>
                             <label className="block text-[11px] uppercase tracking-widest text-white/40 mb-3 font-black">Platform Name</label>
                             <input
                                className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue font-bold text-white uppercase tracking-widest"
                                value={platformConfig.name}
                                onChange={(e) => setPlatformConfig({...platformConfig, name: e.target.value})}
                             />
                          </div>
                          <div>
                             <label className="block text-[11px] uppercase tracking-widest text-white/40 mb-3 font-black">Logo Initial</label>
                             <input
                                className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue font-black text-center text-2xl text-cyber-blue"
                                value={platformConfig.logo}
                                maxLength={1}
                                onChange={(e) => setPlatformConfig({...platformConfig, logo: e.target.value})}
                             />
                          </div>
                       </div>
                    </GlassCard>

                    <GlassCard className="p-10 border-white/10">
                       <h3 className="text-sm font-black uppercase tracking-widest text-cyber-green mb-8 flex items-center gap-3">
                          <MessageCircle size={22} /> Support Node
                       </h3>
                       <div className="space-y-8">
                          <div>
                             <label className="block text-[11px] uppercase tracking-widest text-white/40 mb-3 font-black">WhatsApp Support Number</label>
                             <input
                                className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-green font-mono text-cyber-green text-lg font-black"
                                value={platformConfig.whatsapp}
                                onChange={(e) => setPlatformConfig({...platformConfig, whatsapp: e.target.value})}
                             />
                          </div>
                          <div>
                             <label className="block text-[11px] uppercase tracking-widest text-white/40 mb-3 font-black">Protocol Status</label>
                             <div className="flex items-center gap-4 p-5 bg-cyber-green/5 border-2 border-cyber-green/20 rounded-sm">
                                <span className="w-3 h-3 bg-cyber-green rounded-full animate-pulse shadow-[0_0_15px_#39ff14]" />
                                <span className="text-sm text-cyber-green font-black uppercase tracking-widest">{platformConfig.status}</span>
                             </div>
                          </div>
                       </div>
                    </GlassCard>

                    <GlassCard className="p-10 border-white/10 md:col-span-2 bg-cyber-purple/5">
                       <h3 className="text-sm font-black uppercase tracking-widest text-cyber-purple mb-8 flex items-center gap-3">
                          <DollarSign size={22} /> Economic Rules
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                             <div className="flex justify-between text-[11px] uppercase tracking-widest font-black">
                                <span className="text-white/40">Nexus Protocol Fee (Commission)</span>
                                <span className="text-cyber-purple text-lg">{platformConfig.commission}%</span>
                             </div>
                             <input
                                type="range" min="0" max="100"
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-purple"
                                value={platformConfig.commission}
                                onChange={(e) => setPlatformConfig({...platformConfig, commission: parseInt(e.target.value)})}
                             />
                             <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] leading-relaxed font-bold italic">
                                Note: This fee is automatically deducted from every successful asset acquisition within the nexus to maintain core infrastructure.
                             </p>
                          </div>
                          <div className="flex items-end">
                             <NeonButton onClick={() => alert("Platform configurations saved to neural core.")} variant="purple" className="w-full py-5 text-sm font-black uppercase tracking-widest">Commit Global Rules</NeonButton>
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
                    <NeonButton onClick={() => setIsEggModalOpen(true)} variant="cyan" className="px-8 py-3 text-[10px] flex items-center gap-3 font-black">
                      <Plus size={16} /> New Secret Phrase
                    </NeonButton>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {eggs.map((egg) => (
                       <GlassCard key={egg.id} className="p-8 relative group border-white/10 hover:border-cyber-blue transition-all bg-white/5">
                          <div className="absolute top-6 right-6"><Gift size={24} className="text-white/20 group-hover:text-cyber-blue" /></div>
                          <div className="text-[10px] font-mono text-white/30 mb-2 uppercase tracking-widest font-black">{egg.rarity} SEC_PHRASE</div>
                          <h3 className="text-2xl font-black text-cyber-blue mb-6 font-mono tracking-tighter">{egg.code}</h3>
                          <div className="space-y-4 pt-6 border-t border-white/5">
                             <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-black">
                                <span>Reward Protocol</span>
                                <span className="text-white/80">{egg.reward}</span>
                             </div>
                             <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-black">
                                <span>Total Discoveries</span>
                                <span className="text-white/80">{egg.claimed} Nodes</span>
                             </div>
                             <div className="flex justify-end gap-2 pt-4">
                                <button onClick={() => setEggs(eggs.filter(e => e.id !== egg.id))} className="p-2 text-white/20 hover:text-cyber-pink transition-colors"><Trash2 size={16} /></button>
                             </div>
                          </div>
                       </GlassCard>
                    ))}
                 </div>

                 {/* Egg Creation Modal */}
                 <AnimatePresence>
                    {isEggModalOpen && (
                       <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEggModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md">
                             <GlassCard className="p-10 border-cyber-blue/30 shadow-2xl">
                                <div className="flex justify-between items-center mb-10">
                                   <h3 className="text-2xl font-black uppercase tracking-tighter">New Secret Phrase</h3>
                                   <button onClick={() => setIsEggModalOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                                </div>
                                <form onSubmit={handleCreateEgg} className="space-y-6">
                                   <div>
                                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Phrase Code (Key)</label>
                                      <input
                                         className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue font-mono text-cyber-blue uppercase"
                                         placeholder="e.g. DARK_SIDE"
                                         value={newEgg.code}
                                         onChange={(e) => setNewEgg({...newEgg, code: e.target.value})}
                                         required
                                      />
                                   </div>
                                   <div>
                                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Reward Value</label>
                                      <input
                                         className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue font-bold"
                                         placeholder="e.g. 1000 XP or 20% OFF"
                                         value={newEgg.reward}
                                         onChange={(e) => setNewEgg({...newEgg, reward: e.target.value})}
                                         required
                                      />
                                   </div>
                                   <NeonButton type="submit" variant="cyan" className="w-full py-5 text-sm font-black uppercase tracking-widest mt-4">Initialize Secret</NeonButton>
                                </form>
                             </GlassCard>
                          </motion.div>
                       </div>
                    )}
                 </AnimatePresence>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Neural Shield Control</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <GlassCard className="p-10 border-white/10 bg-cyber-pink/5">
                    <h3 className="text-sm font-black uppercase tracking-widest text-cyber-pink mb-10 flex items-center gap-3">
                      <AlertTriangle size={22} />
                      User Blacklist
                    </h3>
                    <div className="space-y-5 mb-10">
                      {users.filter(u => u.status === 'restricted').map((u) => (
                        <div key={u.id} className="flex items-center justify-between p-4 bg-white/5 rounded-sm border-2 border-white/10">
                          <span className="text-sm font-black font-mono text-white/90 uppercase tracking-tighter">{u.username}</span>
                          <button onClick={() => toggleUserStatus(u.id)} className="text-[11px] text-cyber-blue uppercase font-black hover:underline tracking-widest">Restore Node</button>
                        </div>
                      ))}
                      {users.filter(u => u.status === 'restricted').length === 0 && (
                         <div className="text-center py-6 border-2 border-dashed border-white/10 rounded-sm text-white/20 text-[10px] uppercase font-black tracking-widest">No nodes currently restricted</div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <input className="flex-1 bg-white/5 border-2 border-white/10 rounded-sm px-5 py-3 text-xs focus:outline-none focus:border-cyber-pink text-white font-black uppercase tracking-widest" placeholder="Username to restrict..." />
                      <NeonButton variant="pink" className="px-8 py-3 text-[11px] font-black uppercase tracking-widest">Ban Node</NeonButton>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-10 border-white/10 bg-cyber-blue/5">
                    <h3 className="text-sm font-black uppercase tracking-widest text-cyber-blue mb-10 flex items-center gap-3 font-black">
                      <Lock size={22} />
                      Access Control
                    </h3>
                    <div className="space-y-8">
                      {[
                        { label: 'Maintenance Mode', status: false },
                        { label: 'Vault Lockdown', status: true },
                        { label: 'New Signups', status: true },
                        { label: 'Real-time Feed', status: true },
                      ].map((opt, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest text-white/80 font-black tracking-widest">{opt.label}</span>
                          <button
                             onClick={() => alert(`Toggling ${opt.label} security protocol...`)}
                             className={cn(
                               "w-16 h-8 rounded-full relative transition-all border-2 border-white/20",
                               opt.status ? "bg-cyber-blue shadow-[0_0_20px_#00f2ff]" : "bg-white/5"
                             )}
                          >
                            <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-[0_0_5px_rgba(0,0,0,0.5)]", opt.status ? "right-1.5" : "left-1.5")} />
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
