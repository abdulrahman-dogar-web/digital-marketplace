"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Download, Zap, FileText, CheckCircle2 } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

const MOCK_DOWNLOADS = [
  {
    id: '1',
    name: 'Neural Automation Suite',
    type: 'ZIP / SOURCE',
    size: '1.2 GB',
    version: '4.2.0',
    date: '2025-02-12'
  },
  {
    id: '2',
    name: 'Cyber Nexus Prompt Pack',
    type: 'PDF / TXT',
    size: '15 MB',
    version: '1.0.5',
    date: '2025-02-05'
  }
];

export default function DownloadsPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="mb-16">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
             Transmission Log
             <Download size={32} className="text-cyber-blue" />
          </h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Active digital asset transmission links</p>
        </div>

        {MOCK_DOWNLOADS.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {MOCK_DOWNLOADS.map((item) => (
              <GlassCard key={item.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-cyber-blue/30 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded bg-cyber-blue/10 flex items-center justify-center text-cyber-blue border border-cyber-blue/20">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white group-hover:text-cyber-blue transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                       <span className="text-[10px] font-mono text-white/40 uppercase">v{item.version}</span>
                       <span className="text-[10px] font-mono text-white/40 uppercase">{item.size}</span>
                       <span className="text-[10px] font-mono text-cyber-green uppercase flex items-center gap-1">
                         <CheckCircle2 size={10} /> Verified
                       </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                   <div className="text-right hidden md:block">
                      <div className="text-[8px] uppercase tracking-widest text-white/20 mb-1">Last Transmission</div>
                      <div className="text-[10px] font-mono text-white/40">{item.date}</div>
                   </div>
                   <NeonButton variant="cyan" className="px-8 py-3 text-[10px] flex items-center gap-2 whitespace-nowrap">
                     <Download size={14} /> Start Download
                   </NeonButton>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="py-24 text-center border-white/5">
             <Zap size={48} className="mx-auto text-white/10 mb-6" />
             <h2 className="text-2xl font-bold uppercase tracking-widest text-white/40">No Transmissions</h2>
             <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2">Acquire assets to begin transmission sequences.</p>
          </GlassCard>
        )}

        <div className="mt-12 p-6 rounded bg-cyber-blue/5 border border-cyber-blue/20 flex items-center gap-4">
           <Zap className="text-cyber-blue shrink-0" size={20} />
           <p className="text-[10px] text-white/60 uppercase tracking-widest leading-relaxed">
             Download links are cryptographically signed and valid for 24 hours. If a link expires, re-initialize the transmission from your acquisition log.
           </p>
        </div>
      </div>
    </GlobalLayout>
  );
}
