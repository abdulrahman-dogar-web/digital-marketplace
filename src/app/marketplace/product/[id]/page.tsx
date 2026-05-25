"use client";

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Zap, Share2, Heart, Star, FileText, Play, Download, MessageCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';

// Mock DB with expanded details
const PRODUCTS_DB: Record<string, {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  detailed_description: string;
  rarity: string;
  rarity_score: number;
  category: string;
  image_urls: string[];
  video_url: string;
  features: string[];
  faqs: {q: string, a: string}[];
  reviews: {user: string, rating: number, comment: string, date: string}[];
  seller: {id: string, username: string, rank: string, avatar: string};
  stats: {sales: number, rating: number, views: number};
}> = {
  '1': {
    id: '1',
    name: 'Neural Automation Suite',
    slug: 'neural-automation-suite',
    price: 299,
    description: 'A complete AI-driven automation framework for futuristic SaaS management.',
    detailed_description: 'This system leverages advanced neural networks to optimize your workflow, automate repetitive tasks, and provide real-time analytics for your digital empire. Engineered for high-scale operations, it integrates seamlessly with major cloud providers and local LLM instances.',
    rarity: 'Legendary',
    rarity_score: 98,
    category: 'Automation',
    image_urls: [
      'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'
    ],
    video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    features: ['Real-time Neural Analysis', 'Automated SaaS Orchestration', '256-bit Encrypted Workflows', 'Legendary Rarity Status'],
    faqs: [
      { q: 'Is this compatible with Python 3.12?', a: 'Yes, fully optimized for Python 3.10 and above.' },
      { q: 'Can I run this locally?', a: 'Absolute. We support local LLM orchestration out of the box.' }
    ],
    reviews: [
      { user: 'Cyber_Punk', rating: 5, comment: 'Changed my entire business workflow. Legendary indeed.', date: '2025-01-20' },
      { user: 'Data_Ghost', rating: 4, comment: 'Powerful, but requires some neural setup.', date: '2025-01-15' }
    ],
    seller: { id: 'seller1', username: 'Admin_Nexus', rank: 'Nexus Master', avatar: '👑' },
    stats: { sales: 124, rating: 4.9, views: 8420 }
  }
};

const RELATED_PRODUCTS = [
  {
    id: '2',
    name: 'Cyber Nexus Prompt Pack',
    description: '1000+ elite prompts for generative AI mastery.',
    price: 49,
    rarity: 'Elite',
    image_url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800'
  }
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS_DB[id] || PRODUCTS_DB['1']; // Fallback for demo
  const [activeTab, setActiveTab] = useState('details');
  const [mainImage, setMainImage] = useState(product.image_urls[0]);
  const { addItem } = useCartStore();

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-white/40 hover:text-cyber-blue transition-colors mb-12 uppercase tracking-[0.2em] text-[10px] font-bold group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Visual Gallery */}
          <div className="space-y-6">
            <motion.div
              layoutId="main-image"
              className="relative aspect-video rounded-lg overflow-hidden border border-white/10 glass-panel shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase border bg-black/80 backdrop-blur-md ${
                  product.rarity === 'Legendary' ? 'text-rarity-legendary border-rarity-legendary/30' : 'text-rarity-elite border-rarity-elite/30'
                }`}>
                  {product.rarity} Node
                </span>
              </div>
              <button className="absolute bottom-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-cyber-blue hover:text-black transition-all">
                <Play size={24} fill="currentColor" />
              </button>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.image_urls.map((url: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setMainImage(url)}
                  className={cn(
                    "aspect-square rounded border transition-all cursor-pointer overflow-hidden",
                    mainImage === url ? "border-cyber-blue" : "border-white/5 opacity-40 hover:opacity-100"
                  )}
                >
                  <img src={url} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div>
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h1 className="text-5xl font-black uppercase tracking-tighter">{product.name}</h1>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex text-cyber-gold">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.stats.rating) ? "currentColor" : "none"} />)}
                    </div>
                    <span className="text-white/60 text-xs font-mono">{product.stats.rating}</span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Download size={12} /> {product.stats.sales} Acquisitions
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-4 glass-panel border border-white/10 rounded-lg hover:text-cyber-pink transition-colors"><Heart size={20} /></button>
                <button className="p-4 glass-panel border border-white/10 rounded-lg hover:text-cyber-blue transition-colors"><Share2 size={20} /></button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 mb-8">
              {[
                { id: 'details', label: 'Details', icon: FileText },
                { id: 'specs', label: 'Specs', icon: Zap },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'faq', label: 'FAQ', icon: MessageCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 transition-all border-b-2",
                    activeTab === tab.id ? "border-cyber-blue text-cyber-blue" : "border-transparent text-white/40 hover:text-white"
                  )}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[200px] mb-12">
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <p className="text-white/70 text-lg leading-relaxed mb-6">{product.detailed_description}</p>
                    <div className="p-4 bg-cyber-blue/5 border border-cyber-blue/20 rounded flex items-start gap-4">
                      <AlertTriangle className="text-cyber-blue shrink-0" size={20} />
                      <p className="text-xs text-white/50 leading-relaxed uppercase tracking-widest">Digital License: This asset includes a Lifetime Neural License for 1 production node.</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'specs' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
                    {product.features.map((f: string, i: number) => (
                      <GlassCard key={i} className="p-4 flex items-center gap-3">
                        <Zap size={14} className="text-cyber-blue" />
                        <span className="text-sm">{f}</span>
                      </GlassCard>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <GlassCard className="p-8 border-cyber-blue/20 flex flex-col md:flex-row justify-between items-center gap-8 bg-cyber-blue/5">
              <div className="text-center md:text-left">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Acquisition Protocol</div>
                <div className="text-5xl font-mono font-bold text-cyber-blue">${product.price}</div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <NeonButton
                  onClick={() => {
                    const { stats, features, faqs, reviews, seller, ...rest } = product;
                    void stats; void features; void faqs; void reviews; void seller;
                    addItem({
                      ...rest,
                      image_url: rest.image_urls[0],
                      seller_id: 'seller1',
                      is_approved: true,
                      status: 'published' as const,
                      created_at: new Date().toISOString(),
                      category: { id: '1', name: rest.category || 'Automation', slug: 'automation' }
                    } as unknown as any); // eslint-disable-line @typescript-eslint/no-explicit-any
                  }}
                  variant="purple"
                  className="flex-1 md:flex-none px-8 py-4 text-xs"
                >
                  Add to Cart
                </NeonButton>
                <Link href={`/marketplace/checkout?productId=${product.id}`} className="flex-1 md:flex-none">
                  <NeonButton variant="cyan" className="w-full py-4 text-xs">
                    Buy Now
                  </NeonButton>
                </Link>
              </div>
            </GlassCard>

            {/* Seller Small Card */}
            <div className="mt-8 p-6 glass-panel border border-white/5 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-cyber-blue/10 flex items-center justify-center text-xl border border-cyber-blue/20">{product.seller.avatar}</div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest">{product.seller.username}</div>
                  <div className="text-[10px] text-white/40 font-mono uppercase">{product.seller.rank} • Certified Seller</div>
                </div>
              </div>
              <Link href={`/seller/${product.seller.id}`}>
                <NeonButton variant="cyan" className="px-4 py-2 text-[10px]" glow={false}>Profile</NeonButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Assets */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold uppercase tracking-tighter mb-12">Neural Affinities</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {RELATED_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={{...p, created_at: '', is_approved: true, seller_id: '', category: { id: '1', name: 'Automation', slug: 'automation' }, status: 'published', stats: {sales: 0, views: 0, rating: 0}, rarity_score: 0, image_urls: [p.image_url], slug: ''} as unknown as any} /> // eslint-disable-line @typescript-eslint/no-explicit-any
            ))}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
