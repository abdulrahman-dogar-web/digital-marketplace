"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Timer } from 'lucide-react';

const DAILY_DROPS = [
  {
    id: '4',
    name: 'SaaS Startup Accelerator',
    description: '24-hour flash availability.',
    price: 149,
    rarity: 'Elite' as const,
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    category: 'SaaS'
  }
];

export default function DailyDropsPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center mb-20">
           <div className="inline-flex items-center gap-3 px-4 py-1 glass-panel border border-cyber-gold/30 text-cyber-gold rounded-full text-[10px] uppercase tracking-widest mb-8">
              <Timer size={14} />
              Protocol: Limited Window
           </div>
           <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Daily Drops</h1>
           <p className="text-white/40 max-w-xl uppercase text-[10px] tracking-[0.3em]">Exclusive neural signatures available for a single cycle. Once time expires, these nodes may never resurface.</p>
        </div>

        <div className="max-w-md mx-auto mb-24">
           <div className="glass-panel border border-white/10 p-6 flex justify-between items-center bg-white/5">
              {[
                 { label: 'Hrs', val: '14' },
                 { label: 'Min', val: '22' },
                 { label: 'Sec', val: '09' },
              ].map((t, i) => (
                 <div key={i} className="text-center">
                    <div className="text-4xl font-black font-mono text-white">{t.val}</div>
                    <div className="text-[8px] uppercase tracking-widest text-white/30 font-bold mt-1">{t.label}</div>
                 </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {DAILY_DROPS.map((p) => (
            <div key={p.id} className="relative group">
               <div className="absolute -inset-1 bg-cyber-gold rounded-lg blur opacity-10 group-hover:opacity-30 transition-all duration-1000" />
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
               <ProductCard product={{...p, created_at: '', is_approved: true, seller_id: '', status: 'published', rarity_score: 0, image_urls: [p.image_url], slug: ''} as unknown as any} />
            </div>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
}
