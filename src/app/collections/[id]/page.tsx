"use client";

import { use } from 'react';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const MOCK_COLLECTIONS: Record<string, {name: string, desc: string, products: unknown[]}> = {
  '1': {
    name: 'Starter Kit: Neural Automation',
    desc: 'Everything you need to kickstart your first autonomous SaaS node. This bundle includes the core automation framework and high-conversion prompts.',
    products: [
      { id: '1', name: 'Neural Automation Suite', price: 299, rarity: 'Legendary', image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=400', category: 'Automation' },
      { id: '2', name: 'Cyber Nexus Prompt Pack', price: 49, rarity: 'Elite', image_url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=400', category: 'Prompts' }
    ]
  }
};

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const collection = MOCK_COLLECTIONS[id] || MOCK_COLLECTIONS['1'];

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <Link href="/collections" className="inline-flex items-center gap-2 text-white/40 hover:text-cyber-blue transition-colors mb-12 uppercase tracking-[0.2em] text-[10px] font-bold group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collections
        </Link>

        <div className="mb-20">
           <div className="flex items-center gap-4 text-cyber-blue mb-4 uppercase tracking-[0.4em] font-mono text-[10px]">
              <Layers size={14} />
              Neural Cluster Active
           </div>
           <h1 className="text-6xl font-black uppercase tracking-tighter mb-6">{collection.name}</h1>
           <p className="text-white/60 text-lg max-w-3xl leading-relaxed uppercase tracking-widest font-mono italic border-l-2 border-white/10 pl-8">
              &quot;{collection.desc}&quot;
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {collection.products.map((p: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
             /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
             <ProductCard key={p.id} product={{...p, created_at: '', is_approved: true, seller_id: '', status: 'published' as const, rarity_score: 0, image_urls: [p.image_url], slug: '', stats: {sales: 0, views: 0, rating: 0}, category: { id: '1', name: p.category, slug: 'cat' }} as unknown as any} />
           ))}
        </div>
      </div>
    </GlobalLayout>
  );
}
