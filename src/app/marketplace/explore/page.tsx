"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Compass, Map, Globe, Shield } from 'lucide-react';
import { ProductCard } from '@/components/marketplace/ProductCard';

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
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="mb-20">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
             Explore Nexus
             <Compass size={32} className="text-cyber-blue animate-spin-slow" />
          </h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Navigating the uncharted sectors of the digital civilization</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
           <div className="lg:col-span-1 space-y-6">
              <GlassCard className="p-8 border-cyber-blue/30 bg-cyber-blue/5">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Discovery Modes</h3>
                 <div className="space-y-4">
                    {[
                       { label: 'Neural Mapping', icon: Map },
                       { label: 'Subspace Scanning', icon: Globe },
                       { label: 'Encrypted Nodes', icon: Shield },
                    ].map((m, i) => (
                       <button key={i} className="w-full flex items-center gap-4 px-4 py-3 bg-white/5 rounded border border-white/5 text-[10px] font-bold uppercase tracking-widest hover:border-cyber-blue transition-all">
                          <m.icon size={14} className="text-cyber-blue" />
                          {m.label}
                       </button>
                    ))}
                 </div>
              </GlassCard>
           </div>

           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {EXPLORE_DATA.map((p) => (
                <div key={p.id} className="opacity-60 hover:opacity-100 transition-opacity">
                   <div className="p-2 border border-white/5 rounded-lg">
                      <div className="text-[8px] font-mono text-white/20 mb-2 uppercase">Discovered in Sector {p.id}G</div>
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
