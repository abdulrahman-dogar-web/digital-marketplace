"use client";

import { use } from 'react';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ShieldCheck, Zap, Star, MessageSquare, Globe, Calendar } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';

const MOCK_SELLER = {
  id: 'seller1',
  username: 'Admin_Nexus',
  avatar: '👑',
  rank: 'Nexus Master',
  bio: 'Founding architect of the CyberNest ecosystem. Specializing in high-level neural automation and autonomous governance frameworks.',
  joined: '2042.01.01',
  location: 'Sector 7G',
  stats: {
    sales: '5.2k',
    rating: 4.9,
    products: 24,
    followers: 1204
  },
  products: [
    {
      id: '1',
      name: 'Neural Automation Suite',
      price: 299,
      rarity: 'Legendary' as const,
      image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=400',
      category: 'Automation'
    },
    {
      id: '4',
      name: 'SaaS Startup Accelerator',
      price: 149,
      rarity: 'Elite' as const,
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
      category: 'SaaS'
    }
  ]
};

export default function SellerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  void id;
  const seller = MOCK_SELLER;

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Seller Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <GlassCard className="p-8 text-center flex flex-col items-center border-cyber-blue/30 bg-cyber-blue/5">
              <div className="w-32 h-32 rounded-full bg-cyber-blue/10 border-2 border-cyber-blue/50 flex items-center justify-center text-5xl mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                {seller.avatar}
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">{seller.username}</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-[8px] font-bold uppercase tracking-widest text-cyber-blue mb-8">
                <ShieldCheck size={12} /> Certified Operator
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="p-4 bg-white/5 rounded">
                  <div className="text-lg font-bold font-mono">{seller.stats.sales}</div>
                  <div className="text-[8px] uppercase tracking-widest text-white/30">Sales</div>
                </div>
                <div className="p-4 bg-white/5 rounded">
                  <div className="text-lg font-bold font-mono text-cyber-gold">{seller.stats.rating}</div>
                  <div className="text-[8px] uppercase tracking-widest text-white/30">Rating</div>
                </div>
              </div>

              <NeonButton variant="cyan" className="w-full py-4 text-[10px]">Follow Operator</NeonButton>
            </GlassCard>

            <GlassCard className="p-6 space-y-6">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Neural Profile</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-white/60">
                     <Calendar size={14} className="text-cyber-blue" />
                     <span>Joined: {seller.joined}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                     <Globe size={14} className="text-cyber-blue" />
                     <span>Node: {seller.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                     <Star size={14} className="text-cyber-gold" />
                     <span>Rank: {seller.rank}</span>
                  </div>
               </div>
            </GlassCard>

            <button className="w-full p-6 glass-panel border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white">Neural Message</span>
               <MessageSquare size={16} className="text-cyber-blue" />
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            <div>
               <h2 className="text-[10px] uppercase tracking-[0.4em] text-cyber-blue font-bold mb-4">Biography</h2>
               <p className="text-white/70 text-lg leading-relaxed font-mono">
                  &quot;{seller.bio}&quot;
               </p>
            </div>

            <div>
               <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
                  <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                     <Zap className="text-cyber-blue" size={24} />
                     Active Assets
                  </h2>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{seller.stats.products} Nodes Online</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {seller.products.map((p) => (
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    <ProductCard key={p.id} product={{...p, created_at: '', is_approved: true, seller_id: seller.id, status: 'published', rarity_score: 0, stats: {sales: 0, views: 0, rating: 0}, image_urls: [p.image_url], slug: ''} as unknown as any} />
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
