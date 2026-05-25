"use client";

import { useState, useEffect } from 'react';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  Shield,
  Lock,
  Cpu,
  HardDrive,
  Zap,
  Database,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Transaction } from '@/types';

export default function UserVault() {
  const [activeTab, setActiveTab] = useState<'acquisitions' | 'intel' | 'security'>('acquisitions');
  const [acquisitions, setAcquisitions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setAcquisitions(data);
      } catch (err) {
        console.error('Vault access denied', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVault();
  }, []);

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-cyber-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-4 font-black">
              <Shield size={14} />
              Secure_Connection: Established
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-4">Neural Vault</h1>
            <p className="text-white/40 max-w-xl text-lg font-medium">Encrypted storage for your acquired assets and neural intelligence nodes.</p>
          </div>

          <div className="flex gap-4">
             <div className="glass-panel border border-white/10 rounded-sm px-6 py-4 flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-1">Encrypted Space</span>
                <span className="text-xl font-mono font-bold text-cyber-blue">1.2 GB / 10 GB</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="space-y-4">
            {[
              { id: 'acquisitions', label: 'Acquisitions', icon: HardDrive },
              { id: 'intel', label: 'Neural Intel', icon: Cpu },
              { id: 'security', label: 'Security Config', icon: Lock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'acquisitions' | 'intel' | 'security')}
                className={cn(
                  "w-full flex items-center gap-4 px-8 py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.3em] transition-all",
                  activeTab === tab.id
                    ? "bg-cyber-blue/10 text-cyber-blue border-l-4 border-cyber-blue shadow-[0_0_25px_rgba(0,242,255,0.1)]"
                    : "text-white/30 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Vault Content */}
          <div className="lg:col-span-3">
             <AnimatePresence mode="wait">
             {loading ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center h-64">
                   <Loader2 className="w-10 h-10 text-cyber-blue animate-spin" />
                </motion.div>
             ) : activeTab === 'acquisitions' && (
                <motion.div key="acquisitions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   {acquisitions.length > 0 ? acquisitions.map((tx) => (
                     <GlassCard key={tx.id} className="p-0 overflow-hidden group hover:border-cyber-blue/30 transition-all">
                        <div className="flex flex-col md:flex-row">
                           <div className="w-full md:w-48 h-48 bg-white/5 relative overflow-hidden">
                              {tx.product?.image_url && <img src={tx.product.image_url} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />}
                              <div className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded border border-white/10">
                                 <Zap size={14} className="text-cyber-blue" />
                              </div>
                           </div>
                           <div className="flex-1 p-8 flex flex-col justify-between">
                              <div>
                                 <div className="flex justify-between items-start mb-4">
                                    <div>
                                       <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-1">{tx.product?.name}</h3>
                                       <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{tx.product?.id?.slice(0, 8)} | {new Date(tx.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <span className={cn(
                                       "px-3 py-1 text-[10px] font-black uppercase rounded border",
                                       tx.status === 'approved' ? 'text-cyber-green border-cyber-green/20' : 'text-cyber-gold border-cyber-gold/20'
                                    )}>
                                       {tx.status}
                                    </span>
                                 </div>
                              </div>
                              <div className="flex gap-4">
                                 <button className="flex-1 py-3 bg-cyber-blue text-black font-black uppercase tracking-widest text-[10px] rounded-sm hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all flex items-center justify-center gap-2">
                                    <ChevronRight size={14} />
                                    Access Asset
                                 </button>
                                 <button className="px-6 py-3 border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest rounded-sm">
                                    Intel Details
                                 </button>
                              </div>
                           </div>
                        </div>
                     </GlassCard>
                   )) : (
                     <div className="h-[400px] border-2 border-dashed border-white/10 rounded flex flex-col items-center justify-center text-center p-12">
                        <Database size={48} className="text-white/10 mb-6" />
                        <h3 className="text-2xl font-black text-white/40 uppercase tracking-tighter mb-2">Vault_Empty</h3>
                        <p className="text-[11px] text-white/20 uppercase tracking-widest max-w-xs">Initialize neural links in the marketplace to populate your vault.</p>
                     </div>
                   )}
                </motion.div>
             )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
