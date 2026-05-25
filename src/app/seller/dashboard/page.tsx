"use client";

import { useState } from 'react';
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
  AlertCircle,
  X,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

const INITIAL_ASSETS = [
  { name: 'Neural Automation Suite', rarity: 'Legendary', price: '$299', status: 'Approved', color: 'text-cyber-green' },
  { name: 'Cyber Nexus Prompt Pack', rarity: 'Elite', price: '$49', status: 'Approved', color: 'text-cyber-green' },
  { name: 'Nexus Security Suite', rarity: 'Legendary', price: '$199', status: 'Pending', color: 'text-cyber-gold' },
];

export default function SellerDashboard() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', price: '', rarity: 'Common', category: 'Automation' });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    setAssets(prev => [
      ...prev,
      {
        name: newAsset.name,
        rarity: newAsset.rarity,
        price: `$${newAsset.price}`,
        status: 'Pending',
        color: 'text-cyber-gold'
      }
    ]);
    setIsModalOpen(false);
    setNewAsset({ name: '', price: '', rarity: 'Common', category: 'Automation' });
  };

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-2">Operator Portal</div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Asset Management</h1>
          </div>
          <NeonButton
            onClick={() => setIsModalOpen(true)}
            variant="cyan"
            className="px-6 py-3 flex items-center gap-2"
          >
            <Plus size={18} />
            Initialize New Asset
          </NeonButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Operator Profile */}
          <GlassCard className="lg:col-span-1 border-cyber-blue/20">
            <div className="text-center py-6">
              <div className="w-24 h-24 rounded-full bg-cyber-blue/10 mx-auto mb-4 border border-cyber-blue/30 flex items-center justify-center overflow-hidden relative group">
                <div className="text-4xl group-hover:opacity-20 transition-opacity">🤖</div>
                <button className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/40 transition-opacity">
                  <Upload size={20} className="text-cyber-blue" />
                </button>
              </div>
              <h3 className="text-xl font-bold">Operator_X</h3>
              <p className="text-cyber-blue text-xs font-mono uppercase tracking-widest mt-1">Cyber Agent</p>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest px-4">
                  <span className="text-white/40">XP</span>
                  <span className="text-white/80">1,240 / 2,000</span>
                </div>
                <div className="mx-4 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '62%' }}
                    className="h-full bg-cyber-blue"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 mt-6 pt-6 space-y-1">
              <button className="w-full text-left px-4 py-2 text-sm text-cyber-blue bg-cyber-blue/5 rounded border-l-2 border-cyber-blue">Overview</button>
              <button className="w-full text-left px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors">Earnings</button>
              <button className="w-full text-left px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors">Analytics</button>
              <button className="w-full text-left px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors">Security</button>
            </div>
          </GlassCard>

          <div className="lg:col-span-3 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Sales', value: '42', icon: TrendingUp },
                { label: 'Active Assets', value: assets.length.toString(), icon: Package },
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

            {/* Asset Table */}
            <GlassCard className="p-0 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-lg font-bold uppercase tracking-widest">Global Distribution Table</h2>
                <span className="text-[10px] text-white/40">STORAGE_LINK: 1.2 GB / 5 GB</span>
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
                  <tbody className="divide-y divide-white/5 text-sm font-mono">
                    <AnimatePresence>
                      {assets.map((asset, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-white/5 transition-colors group"
                        >
                          <td className="px-6 py-4 font-bold text-white/80">{asset.name}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 uppercase",
                              asset.rarity === 'Legendary' ? 'text-rarity-legendary border-rarity-legendary/20' :
                              asset.rarity === 'Elite' ? 'text-rarity-elite border-rarity-elite/20' : 'text-rarity-common border-white/20'
                            )}>
                              {asset.rarity}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-cyber-blue">{asset.price}</td>
                          <td className="px-6 py-4">
                            <span className={cn("flex items-center gap-2", asset.color)}>
                              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", asset.color.replace('text-', 'bg-'))} />
                              {asset.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-white/20 hover:text-cyber-blue transition-colors px-2"><Settings size={14} /></button>
                            <button className="text-white/20 hover:text-cyber-pink transition-colors px-2"><AlertCircle size={14} /></button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-xl"
              >
                <GlassCard className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Initialize New Asset</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleAddAsset} className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Asset Name</label>
                      <input
                        type="text"
                        value={newAsset.name}
                        onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Price (USD)</label>
                        <input
                          type="number"
                          value={newAsset.price}
                          onChange={(e) => setNewAsset({...newAsset, price: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Neural Rarity</label>
                        <select
                          value={newAsset.rarity}
                          onChange={(e) => setNewAsset({...newAsset, rarity: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 text-white"
                        >
                          <option value="Common" className="bg-cyber-black">Common</option>
                          <option value="Rare" className="bg-cyber-black">Rare</option>
                          <option value="Elite" className="bg-cyber-black">Elite</option>
                          <option value="Legendary" className="bg-cyber-black">Legendary</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Asset File (ZIP/PDF)</label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-sm hover:border-cyber-blue/30 cursor-pointer transition-colors bg-white/5">
                        <Plus className="text-white/20 mb-2" size={24} />
                        <span className="text-xs text-white/40">Select digital package</span>
                        <input type="file" className="hidden" />
                      </label>
                    </div>

                    <NeonButton type="submit" variant="cyan" className="w-full py-4 text-sm">
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
