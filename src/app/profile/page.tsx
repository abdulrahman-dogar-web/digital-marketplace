"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useUserStore } from '@/store/useUserStore';

export default function ProfilePage() {
  const { user } = useUserStore();

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Neural Profile</h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Public identity in the digital civilization</p>
        </div>

        <GlassCard className="p-12 border-cyber-blue/30 bg-cyber-blue/5">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-full border-4 border-cyber-blue/50 flex items-center justify-center text-6xl bg-black shadow-[0_0_50px_rgba(0,242,255,0.2)]">
                 {user?.avatar_url ? <img src={user.avatar_url} /> : '👤'}
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{user?.username || 'Guest_Explorer'}</h2>
                 <p className="text-cyber-blue font-mono uppercase tracking-[0.3em] text-[10px] mb-8">{user?.rank || 'Initiate'}</p>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                       <div className="text-xl font-bold text-white font-mono">{user?.xp || 0}</div>
                       <div className="text-[8px] uppercase tracking-widest text-white/40">Total XP</div>
                    </div>
                    <div>
                       <div className="text-xl font-bold text-white font-mono">#124</div>
                       <div className="text-[8px] uppercase tracking-widest text-white/40">Nexus Rank</div>
                    </div>
                    <div>
                       <div className="text-xl font-bold text-white font-mono">4</div>
                       <div className="text-[8px] uppercase tracking-widest text-white/40">Badges</div>
                    </div>
                    <div>
                       <div className="text-xl font-bold text-white font-mono">2</div>
                       <div className="text-[8px] uppercase tracking-widest text-white/40">Acquisitions</div>
                    </div>
                 </div>
              </div>
           </div>
        </GlassCard>
      </div>
    </GlobalLayout>
  );
}
