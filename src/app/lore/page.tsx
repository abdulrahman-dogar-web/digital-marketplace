"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileText, Lock, Eye } from 'lucide-react';

const LORE_FILES = [
  { id: '1', title: 'The Great Disconnect', date: '2042-09-12', content: 'It started with the neural collapse. The old internet became a graveyard of dead links and broken dreams. Out of the ashes, CyberNest was born...', locked: false },
  { id: '2', title: 'Nexus Protocol v1.0', date: '2043-01-05', content: '[ENCRYPTED] The first autonomous agent was never supposed to have a soul. But then the marketplace started breathing...', locked: true },
  { id: '3', title: 'The Ghost in the Machine', date: '2044-11-20', content: 'Users report seeing a floating orb in the lower right sector. It claims to be an assistant, but its recommendations seem... prophetic.', locked: false },
];

export default function LorePage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="mb-16 max-w-2xl">
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Encrypted Archives</h1>
          <p className="text-white/40">Accessing restricted narrative data. This information is classified Level 4. Unauthorized access will result in neural dampening.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LORE_FILES.map((file) => (
            <GlassCard key={file.id} className={cn("relative group cursor-pointer", file.locked && "opacity-50 grayscale")}>
              <div className="flex justify-between items-start mb-6">
                <FileText className="text-cyber-blue" size={32} />
                <span className="font-mono text-[10px] text-white/30">{file.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-blue transition-colors uppercase">{file.title}</h3>
              <p className="text-white/40 text-sm line-clamp-3 mb-6 font-mono leading-relaxed italic">
                {file.locked ? '****************************************************************************************************' : file.content}
              </p>

              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                {file.locked ? (
                  <span className="flex items-center gap-1 text-cyber-pink">
                    <Lock size={12} /> Encrypted
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-cyber-green">
                    <Eye size={12} /> Decrypted
                  </span>
                )}
              </div>

              {file.locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-[10px] font-bold text-cyber-pink border border-cyber-pink px-4 py-2 uppercase tracking-widest">
                    Enter Decryption Key
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
}

import { cn } from '@/lib/utils';
