"use client";

import { use } from 'react';
import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Zap, Package, User, Clock, Share2, Heart } from 'lucide-react';
import Link from 'next/link';

// Mock DB
const PRODUCTS_DB: Record<string, {
  id: string;
  name: string;
  price: number;
  description: string;
  rarity: string;
  category: string;
  image: string;
  features: string[];
  seller: string;
}> = {
  '1': {
    id: '1',
    name: 'Neural Automation Suite',
    price: 299,
    description: 'A complete AI-driven automation framework for futuristic SaaS management. This system leverages advanced neural networks to optimize your workflow, automate repetitive tasks, and provide real-time analytics for your digital empire.',
    rarity: 'Legendary',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=1200',
    features: ['Real-time Neural Analysis', 'Automated SaaS Orchestration', '256-bit Encrypted Workflows', 'Legendary Rarity Status'],
    seller: 'Admin_Nexus'
  },
  '2': {
    id: '2',
    name: 'Cyber Nexus Prompt Pack',
    price: 49,
    description: '1000+ elite prompts for generative AI mastery and high-conversion outputs. Carefully crafted to bypass standard limitations and extract the highest quality results from any Large Language Model.',
    rarity: 'Elite',
    category: 'Prompts',
    image: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=1200',
    features: ['Optimized for GPT-4 & Midjourney', 'Conversion-Focused Structures', 'Context-Aware Chaining', 'Elite Neural Tier'],
    seller: 'Operator_X'
  },
  '3': {
    id: '3',
    name: 'Holographic UI Kit',
    price: 89,
    description: 'Next-gen design system for futuristic web applications and immersive interfaces. Includes 50+ holographic components, mouse-reactive lighting, and custom cinematic shaders.',
    rarity: 'Rare',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    features: ['Holographic Component Library', 'Mouse-Reactive Assets', 'Cinematic Glassmorphism', 'Rare Design Tier'],
    seller: 'Data_Ghost'
  }
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS_DB[id];

  if (!product) {
    return null;
  }

  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-cyber-blue/60 hover:text-cyber-blue transition-colors mb-12 uppercase tracking-[0.2em] text-[10px] font-bold">
          ← Return to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Visual Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 glass-panel">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase border bg-black/50 ${
                  product.rarity === 'Legendary' ? 'text-rarity-legendary border-rarity-legendary/30' : 'text-rarity-elite border-rarity-elite/30'
                }`}>
                  {product.rarity}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square rounded border border-white/5 overflow-hidden opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src={product.image} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-1"><User size={12} /> {product.seller}</span>
                  <span className="flex items-center gap-1"><Package size={12} /> {product.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 glass-panel border border-white/10 rounded-sm hover:text-cyber-pink transition-colors"><Heart size={20} /></button>
                <button className="p-3 glass-panel border border-white/10 rounded-sm hover:text-cyber-blue transition-colors"><Share2 size={20} /></button>
              </div>
            </div>

            <p className="text-white/60 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            <GlassCard className="mb-10 border-cyber-blue/20">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cyber-blue mb-6">Neural Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <Zap className="text-cyber-blue" size={14} />
                    {feature}
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="flex items-center justify-between p-8 glass-panel border border-white/10 rounded-lg">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Acquisition Price</div>
                <div className="text-5xl font-mono font-bold text-cyber-blue">${product.price}</div>
              </div>
              <Link href={`/marketplace/checkout?productId=${product.id}`}>
                <NeonButton variant="cyan" className="px-12 py-5 text-sm">Initialize Acquisition</NeonButton>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-[10px] uppercase tracking-widest text-white/20">
              <span className="flex items-center gap-2"><Shield size={14} /> 256-bit Escrow Protection</span>
              <span className="flex items-center gap-2"><Clock size={14} /> 24/7 Node Availability</span>
            </div>
          </motion.div>
        </div>
      </div>
    </GlobalLayout>
  );
}
