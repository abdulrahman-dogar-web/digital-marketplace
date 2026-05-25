"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Layers, Bookmark, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_COLLECTIONS = [
  { id: '1', name: 'Starter Kit: Neural Automation', desc: 'Everything you need to kickstart your first autonomous SaaS node.', count: 4, type: 'featured', color: 'border-cyber-blue' },
  { id: '2', name: 'Elite Designer Toolbox', desc: 'Curated design assets for holographic and immersive UIs.', count: 12, type: 'user', color: 'border-cyber-purple' },
  { id: '3', name: 'Security Protocol Alpha', desc: 'Classified encryption scripts and neural shields.', count: 3, type: 'vault', color: 'border-cyber-pink' },
];

export default function CollectionsPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="mb-20">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Neural Collections</h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">Curated asset clusters for synchronized operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COLLECTIONS.map((c) => (
            <Link key={c.id} href={`/collections/${c.id}`}>
              <GlassCard className={`p-0 overflow-hidden border-t-2 ${c.color} h-full group hover:bg-white/5 transition-all`}>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center text-white/40 group-hover:text-cyber-blue transition-colors">
                       <Layers size={24} />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded">{c.type} cluster</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">{c.name}</h3>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed mb-12">{c.desc}</p>

                  <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-6">
                    <span className="text-[10px] font-mono text-cyber-blue">{c.count} NODES INCLUDED</span>
                    <ArrowRight size={16} className="text-white/20 group-hover:text-cyber-blue group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="mt-32">
           <GlassCard className="p-12 border-dashed border-white/10 text-center flex flex-col items-center">
              <Bookmark className="text-white/10 mb-6" size={48} />
              <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Create Your Own Cluster</h2>
              <p className="text-white/30 text-sm uppercase tracking-widest leading-relaxed max-w-md mb-10">Organize your favorite neural assets into private or public collections to streamline your acquisitions.</p>
              <div className="flex gap-4">
                 <button className="px-8 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all rounded">Learn More</button>
                 <button className="px-8 py-3 bg-cyber-blue text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded">Initialize Collection</button>
              </div>
           </GlassCard>
        </div>
      </div>
    </GlobalLayout>
  );
}
