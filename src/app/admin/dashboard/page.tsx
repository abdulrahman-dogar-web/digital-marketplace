"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import {
  Users,
  ShoppingBag,
  Activity,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  Gift,
  Settings,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { User, Product, Transaction, EasterEgg } from '@/types';
import { supabase } from '@/lib/supabase';

type TabType = 'overview' | 'citizens' | 'assets' | 'transactions' | 'eggs' | 'config';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [eggs, setEggs] = useState<EasterEgg[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEggModalOpen, setIsEggModalOpen] = useState(false);
  const [newEgg, setNewEgg] = useState({ code: '', reward: '', rarity: 'Common' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [u, p, t, e] = await Promise.all([
        supabase.from('users').select('*'),
        supabase.from('products').select('*'),
        supabase.from('transactions').select('*'),
        supabase.from('easter_eggs').select('*')
      ]);

      if (u.data) setUsers(u.data as User[]);
      if (p.data) setProducts(p.data as Product[]);
      if (t.data) setTransactions(t.data as Transaction[]);
      if (e.data) setEggs(e.data as EasterEgg[]);
    } catch (err) {
      console.error('Data acquisition failure', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpdateStatus = async (type: string, id: string, status: string) => {
    try {
      const table = type === 'transactions' ? 'transactions' : 'products';
      const { error } = await supabase
        .from(table)
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error('Status update failure', err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Permanent deletion of citizen node?')) return;
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error('Node deletion failure', err);
    }
  };

  const handleCreateEgg = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('easter_eggs')
        .insert([{
          code: newEgg.code,
          reward_value: newEgg.reward,
          rarity: newEgg.rarity,
          is_active: true
        }]);

      if (error) throw error;
      setIsEggModalOpen(false);
      setNewEgg({ code: '', reward: '', rarity: 'Common' });
      fetchData();
    } catch (err) {
      console.error('Egg generation failure', err);
    }
  };

  if (loading && activeTab === 'overview') {
    return (
      <GlobalLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 text-cyber-blue animate-spin" />
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Navigation Sidebar */}
          <aside className="lg:w-72 space-y-4">
            <div className="mb-10">
              <div className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-2 font-black">Neural Command</div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Console</h1>
            </div>

            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'citizens', label: 'Citizen Nodes', icon: Users },
              { id: 'assets', label: 'Neural Assets', icon: ShoppingBag },
              { id: 'transactions', label: 'Exchanges', icon: ShieldAlert },
              { id: 'eggs', label: 'Easter Eggs', icon: Gift },
              { id: 'config', label: 'System Config', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] transition-all",
                  activeTab === tab.id
                    ? "bg-cyber-blue/10 text-cyber-blue border-l-4 border-cyber-blue shadow-[0_0_20px_rgba(0,242,255,0.1)]"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Console Area */}
          <div className="flex-1 min-h-[600px]">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Total Citizens', value: users.length, icon: Users, color: 'text-cyber-blue' },
                  { label: 'Pending Assets', value: products.filter(p => p.status === 'published').length, icon: ShoppingBag, color: 'text-cyber-purple' },
                  { label: 'Pending Exchanges', value: transactions.filter(t => t.status === 'pending').length, icon: ShieldAlert, color: 'text-cyber-pink' },
                ].map((stat, i) => (
                  <GlassCard key={i} className="p-8 border-white/10">
                    <stat.icon size={24} className={cn("mb-4", stat.color)} />
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{stat.label}</div>
                    <div className="text-4xl font-mono font-bold text-white">{stat.value}</div>
                  </GlassCard>
                ))}
              </div>
            )}

            {activeTab === 'citizens' && (
              <GlassCard className="p-0 overflow-hidden border-white/10">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10">
                    <tr>
                      <th className="px-8 py-5">Node Identity</th>
                      <th className="px-8 py-5">Role</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-sm">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-5">
                          <div className="font-black text-white">{user.username}</div>
                          <div className="text-[10px] text-white/30">{user.email}</div>
                        </td>
                        <td className="px-8 py-5 uppercase text-xs">{user.role}</td>
                        <td className="px-8 py-5">
                          <span className={cn("text-[10px] font-black px-2 py-1 rounded")}>
                            ACTIVE
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={() => handleDeleteUser(user.id)} className="text-white/20 hover:text-cyber-pink transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            )}

            {activeTab === 'transactions' && (
              <GlassCard className="p-0 overflow-hidden border-white/10">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10">
                    <tr>
                      <th className="px-8 py-5">Exchange ID</th>
                      <th className="px-8 py-5">Amount</th>
                      <th className="px-8 py-5">Method</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-sm">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-5 font-black text-white">{tx.transaction_id || tx.txId || tx.id.slice(0,8)}</td>
                        <td className="px-8 py-5 text-cyber-blue font-black">${tx.amount}</td>
                        <td className="px-8 py-5 text-[10px] uppercase">{tx.payment_method || tx.method}</td>
                        <td className="px-8 py-5">
                           <span className={cn(
                             "text-[10px] font-black px-2 py-1 rounded",
                             tx.status === 'approved' ? 'bg-cyber-green/20 text-cyber-green' :
                             tx.status === 'rejected' ? 'bg-cyber-pink/20 text-cyber-pink' : 'bg-cyber-gold/20 text-cyber-gold'
                           )}>
                             {tx.status}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2">
                             <button onClick={() => handleUpdateStatus('transactions', tx.id, 'approved')} className="p-2 text-cyber-green/40 hover:text-cyber-green hover:bg-cyber-green/5 rounded transition-all"><CheckCircle size={18} /></button>
                             <button onClick={() => handleUpdateStatus('transactions', tx.id, 'rejected')} className="p-2 text-cyber-pink/40 hover:text-cyber-pink hover:bg-cyber-pink/5 rounded transition-all"><XCircle size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            )}

            {activeTab === 'eggs' && (
               <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Active Rewards</h2>
                    <NeonButton onClick={() => setIsEggModalOpen(true)} variant="cyan" className="px-6 py-2 text-[10px]">Initialize Egg</NeonButton>
                  </div>
                  <GlassCard className="p-0 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10">
                        <tr>
                          <th className="px-8 py-5">Neural Code</th>
                          <th className="px-8 py-5">Reward</th>
                          <th className="px-8 py-5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-sm">
                        {eggs.map((egg) => (
                          <tr key={egg.id}>
                            <td className="px-8 py-5 text-cyber-blue font-black">{egg.code}</td>
                            <td className="px-8 py-5 uppercase text-xs">
                              {egg.reward_value || 'DATA_NODE'}
                            </td>
                            <td className="px-8 py-5">
                               <span className={cn("text-[10px] px-2 py-1 rounded", !egg.is_active ? 'bg-white/10 text-white/40' : 'bg-cyber-green/20 text-cyber-green font-black')}>
                                 {!egg.is_active ? 'DECRYPTED' : 'ACTIVE'}
                               </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
               </div>
            )}
          </div>
        </div>

        {/* Egg Modal */}
        <AnimatePresence>
          {isEggModalOpen && (
            <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEggModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md">
                <GlassCard className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black uppercase tracking-widest">Generate Egg</h2>
                    <X className="cursor-pointer text-white/40 hover:text-white" onClick={() => setIsEggModalOpen(false)} />
                  </div>
                  <form onSubmit={handleCreateEgg} className="space-y-6">
                    <input
                      placeholder="SECRET_CODE"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-mono text-sm uppercase"
                      value={newEgg.code}
                      onChange={(e) => setNewEgg({...newEgg, code: e.target.value.toUpperCase()})}
                      required
                    />
                    <input
                      placeholder="REWARD_INTEL"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm"
                      value={newEgg.reward}
                      onChange={(e) => setNewEgg({...newEgg, reward: e.target.value})}
                      required
                    />
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white"
                      value={newEgg.rarity}
                      onChange={(e) => setNewEgg({...newEgg, rarity: e.target.value})}
                    >
                      <option value="Common" className="bg-cyber-black">Common</option>
                      <option value="Rare" className="bg-cyber-black">Rare</option>
                      <option value="Elite" className="bg-cyber-black">Elite</option>
                      <option value="Legendary" className="bg-cyber-black">Legendary</option>
                    </select>
                    <NeonButton type="submit" variant="cyan" className="w-full py-4 uppercase font-black tracking-widest">Establish Link</NeonButton>
                  </form>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </GlobalLayout>
  );
}
