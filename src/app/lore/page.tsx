"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileText, Lock, Eye, Terminal, Shield, Zap, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const LORE_FILES = [
  {
    id: '1',
    title: 'The Great Disconnect',
    date: '2042.09.12',
    content: 'It started with the neural collapse. The old internet became a graveyard of dead links and broken dreams. Out of the ashes, CyberNest was born. We realized that information wasn\'t just data—it was the lifeblood of the new digital civilization.',
    locked: false,
    author: 'Nexus_Council',
    category: 'History'
  },
  {
    id: '2',
    title: 'Nexus Protocol v1.0',
    date: '2043.01.05',
    content: 'The first autonomous agent was never supposed to have a soul. But then the marketplace started breathing. We developed the 256-bit encryption layers not to keep users out, but to keep the architecture stable. The protocol is self-healing now.',
    locked: true,
    author: 'Arch_Engineer',
    category: 'Technical'
  },
  {
    id: '3',
    title: 'The Ghost in the Machine',
    date: '2044.11.20',
    content: 'Users report seeing a floating orb in the lower right sector. It claims to be an assistant, but its recommendations seem... prophetic. Some say it\'s the combined consciousness of every seller on the platform. We call it CyberNest AI.',
    locked: false,
    author: 'Void_Watcher',
    category: 'Encounters'
  },
  {
    id: '4',
    title: 'The Vault Origin',
    date: '2045.02.14',
    content: 'Not everything is for sale. Some assets were deemed too powerful for general distribution. They were locked away in a subspace pocket we call The Vault. Accessing it requires more than just currency—it requires a specific neural signature.',
    locked: true,
    author: 'Nexus_Council',
    category: 'Classified',
    link: '/marketplace/vault'
  },
];

export default function LorePage() {
  const [selectedFile, setSelectedFile] = useState<{title: string, category: string, content: string, author: string, date: string, link?: string} | null>(null);

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-cyber-blue mb-4 uppercase tracking-[0.4em] font-mono text-[10px]">
              <Terminal size={14} />
              Archives Connected
            </div>
            <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">Encrypted Archives</h1>
            <p className="text-white/40 leading-relaxed uppercase text-xs tracking-widest">Accessing restricted narrative data. This information is classified Level 4. Unauthorized access will result in neural dampening.</p>
          </div>
          <div className="flex gap-4">
             <div className="p-4 glass-panel border border-white/10 text-center">
                <div className="text-xl font-bold text-cyber-blue font-mono">12%</div>
                <div className="text-[8px] uppercase tracking-widest text-white/30">Total Decrypted</div>
             </div>
             <div className="p-4 glass-panel border border-white/10 text-center">
                <div className="text-xl font-bold text-cyber-pink font-mono">88%</div>
                <div className="text-[8px] uppercase tracking-widest text-white/30">Still Encrypted</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Lore Sidebar */}
           <div className="lg:col-span-1 space-y-6">
              <GlassCard className="p-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
                    <Shield size={12} className="text-cyber-blue" />
                    Security Clearance
                 </h3>
                 <div className="space-y-4">
                    {[
                       { label: 'Public Access', status: 'Granted', color: 'text-cyber-green' },
                       { label: 'Level 2 Intel', status: 'Pending', color: 'text-cyber-gold' },
                       { label: 'Council Logs', status: 'Denied', color: 'text-cyber-pink' },
                    ].map((s, i) => (
                       <div key={i} className="flex justify-between items-center text-[10px] uppercase tracking-widest border-b border-white/5 pb-3 last:border-0">
                          <span className="text-white/30">{s.label}</span>
                          <span className={s.color}>{s.status}</span>
                       </div>
                    ))}
                 </div>
              </GlassCard>

              <div className="p-6 rounded bg-cyber-blue/5 border border-cyber-blue/20">
                 <div className="flex items-center gap-3 mb-4">
                    <Zap className="text-cyber-blue" size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Neural Link Tip</span>
                 </div>
                 <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-mono">
                    Discovering hidden easter eggs in the marketplace can unlock decryption keys for the most classified archive logs.
                 </p>
              </div>
           </div>

           {/* Main Archive Grid */}
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {LORE_FILES.map((file) => (
              <GlassCard
                key={file.id}
                onClick={() => !file.locked && setSelectedFile(file)}
                className={cn(
                  "relative group transition-all duration-500",
                  file.locked ? "opacity-40 grayscale cursor-not-allowed" : "cursor-pointer hover:border-cyber-blue/50 hover:bg-cyber-blue/5"
                )}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cyber-blue">
                       <FileText size={20} />
                    </div>
                    <div>
                       <div className="text-[8px] font-mono text-white/30 uppercase">{file.category}</div>
                       <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{file.author}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-white/20">{file.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter group-hover:text-cyber-blue transition-colors">{file.title}</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest line-clamp-3 mb-8 font-mono leading-relaxed italic">
                  {file.locked ? '****************************************************************************************************' : file.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[8px] font-bold uppercase tracking-[0.2em]">
                    {file.locked ? (
                      <span className="flex items-center gap-2 text-cyber-pink">
                        <Lock size={12} /> STATUS: ENCRYPTED
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-cyber-green">
                        <Eye size={12} /> STATUS: DECRYPTED
                      </span>
                    )}
                  </div>
                  {!file.locked && <Zap size={12} className="text-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>

                {file.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[8px] font-bold text-cyber-pink border border-cyber-pink px-6 py-3 uppercase tracking-[0.3em] bg-black shadow-[0_0_20px_rgba(255,0,255,0.2)]">
                      Level 4 Clearance Required
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
           </div>
        </div>

        {/* Modal for Reading Lore */}
        <AnimatePresence>
          {selectedFile && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedFile(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl"
              >
                <GlassCard className="p-12 border-cyber-blue/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyber-blue" />
                  <div className="flex justify-between items-start mb-12">
                    <div>
                       <div className="text-[10px] font-mono text-cyber-blue uppercase tracking-[0.3em] mb-2">{selectedFile.category} Archive</div>
                       <h2 className="text-4xl font-black uppercase tracking-tighter">{selectedFile.title}</h2>
                    </div>
                    <button onClick={() => setSelectedFile(null)} className="text-white/20 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest">Close [Esc]</button>
                  </div>

                  <div className="prose prose-invert max-w-none">
                     <p className="text-white/80 text-lg leading-relaxed mb-12 italic border-l-2 border-cyber-blue pl-8 py-2 font-mono">
                        &quot;{selectedFile.content}&quot;
                     </p>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
                     <div className="flex gap-4">
                        <div className="text-[8px] uppercase tracking-widest text-white/30">
                           <div className="text-white/60 font-bold mb-1">Authenticated Author</div>
                           {selectedFile.author}
                        </div>
                        <div className="text-[8px] uppercase tracking-widest text-white/30">
                           <div className="text-white/60 font-bold mb-1">Decryption Date</div>
                           {selectedFile.date}
                        </div>
                     </div>
                     {selectedFile.link && (
                        <Link href={selectedFile.link}>
                           <div className="flex items-center gap-3 px-6 py-3 border border-cyber-pink text-cyber-pink text-[10px] font-bold uppercase tracking-widest hover:bg-cyber-pink hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                              <AlertTriangle size={14} />
                              Investigate Vault
                           </div>
                        </Link>
                     )}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </GlobalLayout>
  );
}
