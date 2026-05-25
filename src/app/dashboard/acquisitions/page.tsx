"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Download, ShieldCheck, Clock, FileText, Zap } from 'lucide-react';

export default function AcquisitionsPage() {

  const mockAcquisitions = [
    {
      id: 'TX-9022',
      name: 'Neural Automation Suite',
      price: 299,
      date: '2025-02-12',
      status: 'approved',
      rarity: 'Legendary',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'TX-9024',
      name: 'Cyber Nexus Prompt Pack',
      price: 49,
      date: '2025-02-14',
      status: 'verifying',
      rarity: 'Elite',
      image: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=400'
    },
  ];

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Neural Acquisitions</h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">History of established neural links within the nexus</p>
        </div>

        <div className="space-y-6">
          {mockAcquisitions.map((item) => (
            <GlassCard key={item.id} className="p-0 overflow-hidden group">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden relative border-r border-white/5">
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="flex-1 p-8 flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                         item.rarity === 'Legendary' ? 'text-rarity-legendary border-rarity-legendary/20' : 'text-rarity-elite border-rarity-elite/20'
                       }`}>{item.rarity}</span>
                       <span className="text-white/20 font-mono text-[10px]">{item.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-widest text-white group-hover:text-cyber-blue transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                       <span className="flex items-center gap-2"><Clock size={12} /> {item.date}</span>
                       <span className="flex items-center gap-2"><ShieldCheck size={12} /> Verified Link</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end gap-6">
                    <div className={cn(
                      "px-4 py-2 rounded text-[10px] font-bold uppercase border flex items-center gap-2",
                      item.status === 'approved' ? "text-cyber-green border-cyber-green/20 bg-cyber-green/5" : "text-cyber-gold border-cyber-gold/20 bg-cyber-gold/5"
                    )}>
                      {item.status === 'approved' ? <ShieldCheck size={12} /> : <Clock size={12} />}
                      {item.status}
                    </div>

                    <div className="flex gap-3">
                       <button className="p-3 glass-panel border border-white/10 rounded-sm hover:text-cyber-blue transition-colors"><FileText size={18} /></button>
                       <NeonButton
                         variant={item.status === 'approved' ? 'cyan' : 'purple'}
                         disabled={item.status !== 'approved'}
                         className="px-8 py-3 text-[10px] flex items-center gap-3"
                       >
                         {item.status === 'approved' ? (
                           <>
                             <Download size={14} /> Transmit Asset
                           </>
                         ) : (
                           'Awaiting Council'
                         )}
                       </NeonButton>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Empty State / Help */}
        <div className="mt-20 p-12 glass-panel border border-white/5 rounded-2xl text-center">
           <Zap className="text-cyber-blue mx-auto mb-6 opacity-20" size={48} />
           <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Node Disconnected?</h4>
           <p className="text-white/40 text-sm uppercase tracking-widest leading-relaxed max-w-lg mx-auto mb-8">
              If your acquired assets are not appearing, ensure your neural frequency (Transaction ID) was entered correctly during verification.
           </p>
           <Link href="/support">
             <NeonButton variant="cyan" className="px-10 py-4 text-[10px]" glow={false}>Contact Support Node</NeonButton>
           </Link>
        </div>
      </div>
    </GlobalLayout>
  );
}

import { cn } from '@/lib/utils';
import Link from 'next/link';
