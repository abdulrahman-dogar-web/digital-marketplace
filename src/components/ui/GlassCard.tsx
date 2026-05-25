"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className, hoverGlow = true, onClick }: GlassCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hoverGlow ? {
        boxShadow: "0 0 25px rgba(0,242,255,0.2)",
        borderColor: "rgba(0,242,255,0.3)"
      } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        'glass-panel p-6 rounded-lg border border-white/5 relative overflow-hidden group',
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
