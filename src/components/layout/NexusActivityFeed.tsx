"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/ui/GlassCard';
import { Zap, ShoppingBag, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Activity {
  id: string | number;
  type: 'purchase' | 'signup' | 'listing';
  user: string;
  item?: string;
  time: string;
}

export const NexusActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Initial Load (Mocked for now, would be a join in production)
    setActivities([
      { id: 1, type: 'purchase', user: 'Neural_Drifter', item: 'AI Agent Script', time: '2m ago' },
      { id: 2, type: 'signup', user: 'Data_Ghost', time: '5m ago' },
      { id: 3, type: 'listing', user: 'Operator_X', item: 'Quantum Prompts', time: '12m ago' },
    ]);

    // Real-time Subscription Simulation
    const channel = supabase
      .channel('public:transactions')
      .on('postgres_changes' as any, { event: 'INSERT', table: 'transactions' }, (payload: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const newActivity: Activity = {
          id: payload.new.id,
          type: 'purchase',
          user: 'Citizen_' + payload.new.user_id.slice(0,4),
          item: 'New Asset',
          time: 'Just now'
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 8));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <GlassCard className="p-0 overflow-hidden border-cyber-blue/20 bg-cyber-blue/5 backdrop-blur-xl">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
        <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-cyber-green rounded-full animate-pulse shadow-[0_0_10px_#39ff14]" />
          Live Nexus Activity
        </h2>
        <div className="flex items-center gap-4">
           <span className="text-[10px] text-white/40 font-mono uppercase animate-pulse">Syncing with Subspace Nodes...</span>
        </div>
      </div>

      <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between text-sm py-4 border-b border-white/5 last:border-0 group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded flex items-center justify-center border transition-all ${
                  activity.type === 'purchase' ? 'bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue' :
                  activity.type === 'signup' ? 'bg-cyber-purple/10 border-cyber-purple/30 text-cyber-purple' :
                  'bg-cyber-pink/10 border-cyber-pink/30 text-cyber-pink'
                }`}>
                  {activity.type === 'purchase' ? <ShoppingBag size={18} /> :
                   activity.type === 'signup' ? <UserPlus size={18} /> :
                   <Zap size={18} />}
                </div>
                <div>
                  <div className="text-white/90">
                    <span className="font-bold text-cyber-blue font-mono">{activity.user}</span>
                    <span className="mx-2 text-white/40 uppercase text-[10px] tracking-widest">
                       {activity.type === 'purchase' ? 'acquired' :
                        activity.type === 'signup' ? 'joined nexus' :
                        'initialized'}
                    </span>
                    <span className="text-white font-bold">{activity.item}</span>
                  </div>
                  <div className="text-[8px] text-white/20 uppercase tracking-[0.2em] font-mono mt-1">Transaction Node: Verified</div>
                </div>
              </div>
              <div className="text-right">
                 <div className="text-white/30 text-[10px] font-mono mb-1">{activity.time}</div>
                 <div className="text-cyber-green text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Node OK</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-white/5 text-center border-t border-white/5">
         <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyber-blue hover:text-white transition-colors">Open Global Nexus Logs</button>
      </div>
    </GlassCard>
  );
};
