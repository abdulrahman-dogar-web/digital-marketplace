"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Sparkles, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

const AI_PICKS = [
  {
    id: '1',
    name: 'Neural Automation Suite',
    description: 'High compatibility detected with your profile.',
    price: 299,
    rarity: 'Legendary' as const,
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800',
    category: 'Automation'
  },
  {
    id: '6',
    name: 'Nexus Security Suite',
    description: 'Security baseline upgrade recommended.',
    price: 199,
    rarity: 'Legendary' as const,
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'Security'
  }
];

export default function AIPicksPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
           <motion.div
             animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="inline-block p-4 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 mb-8"
           >
              <Sparkles size={40} className="text-cyber-blue" />
           </motion.div>
           <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">AI Recommendations</h1>
           <p className="text-white/40 leading-relaxed uppercase text-[10px] tracking-[0.3em]">Personalized neural matches calculated by the CyberNest AI Core.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
           <div className="lg:col-span-1">
              <GlassCard className="p-8 border-cyber-blue/30 bg-cyber-blue/5">
                 <div className="flex items-center gap-4 mb-8">
                    <Bot className="text-cyber-blue" size={32} />
                    <h3 className="font-bold uppercase tracking-widest text-white">Neural Analyzer</h3>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                          <span>Model Confidence</span>
                          <span>94.2%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '94.2%' }} className="h-full bg-cyber-blue" />
                       </div>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-widest font-mono italic">
                       &quot;I have analyzed your recent node interactions and market volatility. These assets represent the most optimized path for your current neural objectives.&quot;
                    </p>
                 </div>
              </GlassCard>
           </div>

           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {AI_PICKS.map((p) => (
                 /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                 <ProductCard key={p.id} product={{...p, created_at: '', is_approved: true, seller_id: '', status: 'published', rarity_score: 0, image_urls: [p.image_url], slug: ''} as unknown as any} />
              ))}
           </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
