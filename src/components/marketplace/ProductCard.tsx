"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';

export const ProductCard = ({ product }: { product: Product }) => {
  const rarityColors = {
    Common: 'text-rarity-common border-rarity-common/30',
    Rare: 'text-rarity-rare border-rarity-rare/30',
    Elite: 'text-rarity-elite border-rarity-elite/30',
    Legendary: 'text-rarity-legendary border-rarity-legendary/30',
  };

  return (
    <GlassCard className="group h-full flex flex-col">
      <div className="relative h-48 mb-4 overflow-hidden rounded-md bg-white/5">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
        />
        <div className={cn(
          'absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase border bg-black/50',
          rarityColors[product.rarity]
        )}>
          {product.rarity}
        </div>
      </div>

      <Link href={`/marketplace/product/${product.id}`}>
        <h3 className="text-xl font-bold mb-1 group-hover:text-cyber-blue transition-colors cursor-pointer">{product.name}</h3>
      </Link>
      <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>

      <div className="mt-auto flex justify-between items-center">
        <span className="text-2xl font-mono text-cyber-blue">${product.price}</span>
        <Link href={`/marketplace/checkout?productId=${product.id}`}>
          <NeonButton variant="cyan" className="px-4 py-1.5 text-xs">Initialize</NeonButton>
        </Link>
      </div>
    </GlassCard>
  );
};
