"use client";

import { useSearchParams } from 'next/navigation';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Search as SearchIcon, Cpu } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mb-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
           Search Results
           <SearchIcon size={32} className="text-cyber-blue" />
        </h1>
        <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Neural matching for &quot;{query}&quot;</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Simple simulated search results based on id 1 for demo */}
         {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
         <ProductCard product={{id: '1', name: 'Neural Automation Suite', price: 299, rarity: 'Legendary' as const, image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=400', category: { id: '1', name: 'Automation', slug: 'automation' }, created_at: '', is_approved: true, seller_id: '', status: 'published' as const, rarity_score: 0, image_urls: [], slug: ''} as unknown as any} />
      </div>

      <div className="mt-32">
         <GlassCard className="p-12 border-white/10 text-center flex flex-col items-center">
            <Cpu className="text-white/10 mb-6" size={48} />
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">No other exact matches</h2>
            <p className="text-white/30 text-sm uppercase tracking-widest leading-relaxed max-w-md">Our AI core is scanning alternative subspace nodes. Try broadening your neural parameters.</p>
         </GlassCard>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <GlobalLayout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-cyber-blue animate-pulse">SCANNING NEXUS...</div>}>
         <SearchResults />
      </Suspense>
    </GlobalLayout>
  );
}
