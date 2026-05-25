"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Compass, Map, Globe, Shield, Search, Zap, Filter } from 'lucide-react';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { useState } from 'react';
import { motion } from 'framer-motion';

const EXPLORE_DATA = [
  {
    id: '1',
    name: 'Neural Automation Suite',
    price: 299,
    rarity: 'Legendary' as const,
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800',
    category: { id: '1', name: 'Automation', slug: 'automation' },
    description: 'Autonomous digital governance framework.',
    slug: 'neural-automation-suite'
  },
  {
    id: '2',
    name: 'Cyber Nexus Prompt Pack',
    price: 49,
    rarity: 'Elite' as const,
    image_url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800',
    category: { id: '2', name: 'Prompts', slug: 'prompts' },
    description: 'Master the art of prompt engineering.',
    slug: 'cyber-nexus-prompt-pack'
  },
  {
    id: '3',
    name: 'Holographic UI Kit',
    price: 89,
    rarity: 'Rare' as const,
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    category: { id: '3', name: 'Design', slug: 'design' },
    description: 'Immersive UI components for next-gen apps.',
    slug: 'holographic-ui-kit'
  },
  {
    id: '6',
    name: 'Nexus Security Suite',
    price: 199,
    rarity: 'Legendary' as const,
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: { id: '6', name: 'Security', slug: 'security' },
    description: 'Advanced encryption for digital nodes.',
    slug: 'nexus-security-suite'
  }
];

export default function ExplorePage() {
  const [search, setSearch] = useState('');

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
               Explore Nexus
               <Compass size={32} className="text-cyber-blue animate-spin-slow" />
            </h1>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Navigating the uncharted sectors of the digital civilization</p>
          </div>
          <div className="w-full md:w-80 relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
             <input
               className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue transition-all"
               placeholder="Scan sectors..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
           <div className="lg:col-span-1 space-y-6">
              <GlassCard className="p-8 border-cyber-blue/30 bg-cyber-blue/5">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-8 flex items-center gap-2">
                    <Filter size={14} className="text-cyber-blue" />
                    Discovery Modes
                 </h3>
                 <div className="space-y-4">
                    {[
                       { label: 'Neural Mapping', icon: Map, active: true },
                       { label: 'Subspace Scanning', icon: Globe, active: false },
                       { label: 'Encrypted Nodes', icon: Shield, active: false },
                    ].map((m, i) => (
                       <button key={i} className={cn(
                          "w-full flex items-center gap-4 px-4 py-4 rounded border text-[10px] font-bold uppercase tracking-widest transition-all",
                          m.active ? "bg-cyber-blue text-black border-cyber-blue shadow-[0_0_15px_#00f2ff]" : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-cyber-blue/50"
                       )}>
                          <m.icon size={16} />
                          {m.label}
                       </button>
                    ))}
                 </div>

                 <div className="mt-12 pt-12 border-t border-white/5">
                    <div className="text-[8px] uppercase tracking-widest text-white/20 mb-4 font-bold">Signal Strength</div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} className="h-full bg-cyber-blue" />
                    </div>
                    <div className="flex justify-between mt-2 text-[8px] font-mono text-cyber-blue/60 uppercase">
                       <span>Sector_7G</span>
                       <span>84%</span>
                    </div>
                 </div>
              </GlassCard>

              <div className="p-6 rounded bg-cyber-purple/5 border border-cyber-purple/20">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyber-purple mb-3 flex items-center gap-2">
                    <Zap size={12} /> Live Pulse
                 </h4>
                 <p className="text-[9px] text-white/40 leading-relaxed uppercase tracking-widest">
                    New neural signatures detected in the design sector. Calibration recommended.
                 </p>
              </div>
           </div>

           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {EXPLORE_DATA.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => (
                <div key={p.id} className="opacity-80 hover:opacity-100 transition-opacity">
                   <div className="p-4 border border-white/5 rounded-lg bg-white/5 hover:border-cyber-blue/20 transition-all">
                      <div className="flex justify-between items-center mb-4">
                         <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Sector {p.id}G Signature</div>
                         <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
                      </div>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <ProductCard product={{...p, created_at: '', is_approved: true, seller_id: '', status: 'published' as const, rarity_score: 0, image_urls: [p.image_url]} as unknown as any} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

import { cn } from '@/lib/utils';
