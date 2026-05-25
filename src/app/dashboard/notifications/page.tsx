"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bell, Shield, Zap, Mail, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const INITIAL_NOTES = [
  { id: 1, title: 'Achievement Unlocked', message: 'You have earned the "Neural Pioneer" badge for your 10th acquisition.', type: 'success', date: '2h ago' },
  { id: 2, title: 'Security Alert', message: 'Login detected from a new subspace node (192.168.1.1).', type: 'warning', date: '5h ago' },
  { id: 3, title: 'Price Drop', message: 'Holographic UI Kit is now -20% for a limited time.', type: 'info', date: '1d ago' },
];

export default function NotificationsPage() {
  const [notes, setNotes] = useState(INITIAL_NOTES);

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
                 Nexus Alerts
                 <Bell size={32} className="text-cyber-blue" />
              </h1>
              <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Global & personal transmission history</p>
           </div>
           <button onClick={() => setNotes([])} className="text-[8px] font-bold uppercase tracking-widest text-white/20 hover:text-cyber-pink transition-colors">Purge Logs</button>
        </div>

        <div className="space-y-4">
           <AnimatePresence>
              {notes.map((n) => (
                 <motion.div key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <GlassCard className="p-6 flex items-center gap-6 group hover:bg-white/5 transition-all">
                       <div className={`w-12 h-12 rounded flex items-center justify-center shrink-0 border ${
                          n.type === 'success' ? 'bg-cyber-green/10 border-cyber-green/20 text-cyber-green' :
                          n.type === 'warning' ? 'bg-cyber-gold/10 border-cyber-gold/20 text-cyber-gold' :
                          'bg-cyber-blue/10 border-cyber-blue/20 text-cyber-blue'
                       }`}>
                          {n.type === 'success' ? <Zap size={20} /> : n.type === 'warning' ? <Shield size={20} /> : <Mail size={20} />}
                       </div>
                       <div className="flex-1">
                          <h3 className="font-bold text-white mb-1 uppercase tracking-widest text-sm">{n.title}</h3>
                          <p className="text-white/40 text-xs uppercase tracking-widest leading-relaxed">{n.message}</p>
                       </div>
                       <div className="text-right">
                          <div className="text-[10px] font-mono text-white/20 mb-2">{n.date}</div>
                          <button onClick={() => setNotes(notes.filter(x => x.id !== n.id))} className="text-white/10 hover:text-cyber-pink transition-colors opacity-0 group-hover:opacity-100">
                             <Trash2 size={14} />
                          </button>
                       </div>
                    </GlassCard>
                 </motion.div>
              ))}
           </AnimatePresence>

           {notes.length === 0 && (
              <GlassCard className="py-20 text-center flex flex-col items-center">
                 <Shield className="text-white/10 mb-6" size={48} />
                 <h2 className="text-xl font-bold uppercase tracking-widest text-white/40">Neural Silence</h2>
                 <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2">No active transmissions detected in your current cycle.</p>
              </GlassCard>
           )}
        </div>
      </div>
    </GlobalLayout>
  );
}
