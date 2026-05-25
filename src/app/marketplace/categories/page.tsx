"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Grid, Zap } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: '1', name: 'Automation', icon: '🤖', count: 124, desc: 'Autonomous scripts and neural workflows.' },
  { id: '2', name: 'Prompts', icon: '✍️', count: 842, desc: 'Elite generative AI instructions.' },
  { id: '3', name: 'Design', icon: '🎨', count: 312, desc: 'Holographic and immersive UI assets.' },
  { id: '4', name: 'SaaS', icon: '☁️', count: 156, desc: 'Next-gen software as a service nodes.' },
  { id: '5', name: 'Scripts', icon: '📜', count: 2400, desc: 'Custom code for digital operations.' },
  { id: '6', name: 'Security', icon: '🛡️', count: 56, desc: 'Neural shields and encryption tools.' },
];

export default function CategoriesPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="mb-20">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
             Neural Taxonomies
             <Grid size={32} className="text-cyber-purple" />
          </h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Classifying the assets of the digital civilization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {CATEGORIES.map((c, i) => (
              <Link key={i} href={`/marketplace?category=${c.id}`}>
                <GlassCard className="p-8 group hover:bg-cyber-purple/5 transition-all cursor-pointer border-white/5 hover:border-cyber-purple/30 h-full flex flex-col">
                   <div className="flex justify-between items-start mb-12">
                      <div className="text-4xl group-hover:scale-110 transition-transform">{c.icon}</div>
                      <span className="text-[10px] font-mono text-cyber-purple font-bold bg-cyber-purple/10 px-3 py-1 rounded-full">{c.count} NODES</span>
                   </div>
                   <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">{c.name}</h3>
                   <p className="text-white/40 text-xs uppercase tracking-widest leading-relaxed">{c.desc}</p>
                   <div className="mt-auto pt-12 flex items-center gap-2 text-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Enter Sector</span>
                   </div>
                </GlassCard>
              </Link>
           ))}
        </div>
      </div>
    </GlobalLayout>
  );
}
