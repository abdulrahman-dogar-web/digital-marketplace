"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import {
  Package,
  Plus,
  Settings,
  TrendingUp,
  MessageSquare,
  Upload,
  Loader2,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';

export default function SellerDashboard() {
  const [assets, setAssets] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', price: '', rarity: 'Common', description: '' });

  // In a real app, this would be the logged in user's ID
  const sellerId = "77777777-7777-7777-7777-777777777777"; // Match seed seller ID

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', sellerId);

      if (error) throw error;
      setAssets(data as Product[]);
    } catch (err) {
      console.error('Asset retrieval failed', err);
    } finally {
      setLoading(false);
    }
  }, [sellerId]);

  useEffect(() => { fetchAssets(); }, [fetchAssets]);

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: newAsset.name,
          price: parseFloat(newAsset.price),
          rarity: newAsset.rarity,
          description: newAsset.description,
          seller_id: sellerId,
          status: 'published',
          is_approved: false // Requires admin approval
        }]);

      if (error) throw error;

      setIsModalOpen(false);
      setNewAsset({ name: '', price: '', rarity: 'Common', description: '' });
      fetchAssets();
    } catch (err) {
      console.error('Asset initialization failed', err);
    }
  };

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-2 font-black">Operator Portal</div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-white">Asset Management</h1>
          </div>
          <NeonButton
            onClick={() => setIsModalOpen(true)}
            variant="cyan"
            className="px-8 py-3 flex items-center gap-3 font-black uppercase text-[11px]"
          >
            <Plus size={18} />
            Initialize New Asset
          </NeonButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Operator Profile */}
          <GlassCard className="lg:col-span-1 border-cyber-blue/30 bg-white/5 p-8">
            <div className="text-center py-6">
              <div className="w-28 h-28 rounded-full bg-cyber-blue/10 mx-auto mb-6 border-2 border-cyber-blue flex items-center justify-center overflow-hidden relative group shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                <div className="text-5xl group-hover:opacity-20 transition-opacity">🤖</div>
                <button className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/60 transition-opacity">
                  <Upload size={24} className="text-cyber-blue" />
                </button>
              </div>
              <h3 className="text-2xl font-black uppercase text-white tracking-tighter">Operator_X</h3>
              <p className="text-cyber-blue text-[10px] font-black font-mono uppercase tracking-[0.3em] mt-2">Cyber Agent</p>
            </div>
          </GlassCard>

          <div className="lg:col-span-3 space-y-10">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Total Sales', value: '42', icon: TrendingUp },
                { label: 'Active Assets', value: assets.length.toString(), icon: Package },
                { label: 'Unread Intel', value: '3', icon: MessageSquare },
              ].map((stat, i) => (
                <GlassCard key={i} className="flex items-center gap-8 p-8 bg-white/5 border-white/10">
                  <div className="p-4 bg-white/5 rounded-lg text-cyber-blue">
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{stat.label}</div>
                    <div className="text-3xl font-mono font-bold text-white">{stat.value}</div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Asset Table */}
            <GlassCard className="p-0 overflow-hidden border-white/10">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h2 className="text-lg font-black uppercase tracking-widest text-white">Global Distribution Table</h2>
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                   <div className="flex justify-center py-12"><Loader2 className="animate-spin text-cyber-blue" /></div>
                ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 bg-white/5">
                      <th className="px-8 py-5">Asset Name</th>
                      <th className="px-8 py-5">Rarity</th>
                      <th className="px-8 py-5">Price</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm font-mono">
                    <AnimatePresence>
                      {assets.map((asset) => (
                        <motion.tr
                          key={asset.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-white/5 transition-colors group"
                        >
                          <td className="px-8 py-5 font-black text-white/90 uppercase tracking-tighter">{asset.name}</td>
                          <td className="px-8 py-5">
                            <span className={cn(
                              "text-[10px] font-black px-3 py-1 rounded border-2 uppercase",
                              asset.rarity === 'Legendary' ? 'text-rarity-legendary border-rarity-legendary/20' :
                              asset.rarity === 'Elite' ? 'text-rarity-elite border-rarity-elite/20' : 'text-rarity-common border-white/20'
                            )}>
                              {asset.rarity}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-cyber-blue font-black">${asset.price}</td>
                          <td className="px-8 py-5">
                            <span className={cn(
                              "flex items-center gap-3 font-black uppercase text-[10px]",
                              asset.status === 'published' ? 'text-cyber-green' : 'text-cyber-gold'
                            )}>
                              {asset.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end gap-3">
                                <button className="p-2 text-white/20 hover:text-cyber-blue transition-all hover:bg-white/5 rounded-sm"><Settings size={18} /></button>
                             </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                )}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-xl"
              >
                <GlassCard className="p-10 border-2 border-cyber-blue/30 shadow-2xl">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Initialize New Asset</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                      <X size={28} />
                    </button>
                  </div>

                  <form onSubmit={handleAddAsset} className="space-y-8">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] font-black text-white/40 mb-3 ml-1">Asset Identity</label>
                      <input
                        type="text"
                        value={newAsset.name}
                        onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                        className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue font-bold uppercase tracking-widest"
                        placeholder="Neural Package Name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.3em] font-black text-white/40 mb-3 ml-1">Acquisition Cost (USD)</label>
                        <input
                          type="number"
                          value={newAsset.price}
                          onChange={(e) => setNewAsset({...newAsset, price: e.target.value})}
                          className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue font-mono font-black"
                          placeholder="299"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.3em] font-black text-white/40 mb-3 ml-1">Neural Rarity</label>
                        <select
                          value={newAsset.rarity}
                          onChange={(e) => setNewAsset({...newAsset, rarity: e.target.value})}
                          className="w-full bg-white/5 border-2 border-white/10 rounded-sm px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue text-white font-black uppercase tracking-widest"
                        >
                          <option value="Common" className="bg-cyber-black">Common</option>
                          <option value="Rare" className="bg-cyber-black">Rare</option>
                          <option value="Elite" className="bg-cyber-black">Elite</option>
                          <option value="Legendary" className="bg-cyber-black">Legendary</option>
                        </select>
                      </div>
                    </div>

                    <NeonButton type="submit" variant="cyan" className="w-full py-5 text-sm font-black uppercase tracking-[0.2em] mt-4">
                      Establish Neural Link
                    </NeonButton>
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
