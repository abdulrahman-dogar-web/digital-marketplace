"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

interface NeonButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: 'cyan' | 'purple' | 'pink' | 'green';
  glow?: boolean;
}

export const NeonButton = ({
  children,
  className,
  variant = 'cyan',
  glow = true,
  ...props
}: NeonButtonProps) => {
  const variants = {
    cyan: 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10',
    purple: 'border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10',
    pink: 'border-cyber-pink text-cyber-pink hover:bg-cyber-pink/10',
    green: 'border-cyber-green text-cyber-green hover:bg-cyber-green/10',
  };

  const glows = {
    cyan: 'shadow-[0_0_15px_rgba(0,242,255,0.3)]',
    purple: 'shadow-[0_0_15px_rgba(188,19,254,0.3)]',
    pink: 'shadow-[0_0_15px_rgba(255,0,255,0.3)]',
    green: 'shadow-[0_0_15px_rgba(57,255,20,0.3)]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'px-6 py-2 border rounded-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer',
        variants[variant],
        glow && glows[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
