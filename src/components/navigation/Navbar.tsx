"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Search, Globe, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCartStore();

  const navLinks = [
    { label: 'Market', href: '/marketplace', icon: Globe },
    { label: 'Vault', href: '/marketplace/vault', icon: Shield },
    { label: 'Lore', href: '/lore', icon: Zap },
    { label: 'Elite', href: '/leaderboard', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[400] px-6 py-6 pointer-events-none">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="pointer-events-auto group">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-cyber-blue rounded flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)] group-hover:scale-110 transition-transform">
                <span className="text-black font-black text-xl">N</span>
             </div>
             <span className="text-white font-black uppercase tracking-tighter text-2xl hidden md:block group-hover:text-cyber-blue transition-colors">CyberNest</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto p-1 glass-panel border-white/10 rounded-full bg-black/40 backdrop-blur-md">
           {navLinks.map((link) => (
             <Link key={link.href} href={link.href}>
                <div className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                  pathname === link.href ? "bg-cyber-blue text-black shadow-[0_0_15px_#00f2ff]" : "text-white/40 hover:text-white hover:bg-white/5"
                )}>
                  <link.icon size={12} />
                  {link.label}
                </div>
             </Link>
           ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 pointer-events-auto">
           <Link href="/marketplace/search" className="p-3 glass-panel border-white/10 rounded-full hover:bg-white/5 transition-all text-white/40 hover:text-cyber-blue">
              <Search size={20} />
           </Link>

           <Link href="/cart" className="p-3 glass-panel border-white/10 rounded-full hover:bg-white/5 transition-all text-white/40 hover:text-cyber-blue relative">
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_#ff00ff]">{items.length}</span>
              )}
           </Link>

           <Link href="/dashboard" className="hidden md:flex items-center gap-3 pl-2 pr-6 py-2 glass-panel border-white/10 rounded-full hover:bg-cyber-blue/10 transition-all group border hover:border-cyber-blue/30">
              <div className="w-8 h-8 rounded-full bg-cyber-blue/10 flex items-center justify-center text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all border border-cyber-blue/20">
                 <User size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-cyber-blue">Neural Node</span>
           </Link>

           {/* Mobile Menu Toggle */}
           <button
             onClick={() => setIsOpen(!isOpen)}
             className="lg:hidden p-3 glass-panel border-white/10 rounded-full text-white/60"
           >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 lg:hidden glass-panel border-cyber-blue/20 bg-black/90 p-8 rounded-2xl pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,1)]"
          >
             <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                   <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                      <div className="flex items-center gap-4 text-white group">
                         <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all">
                            <link.icon size={20} />
                         </div>
                         <span className="text-lg font-black uppercase tracking-tighter">{link.label}</span>
                      </div>
                   </Link>
                ))}
                <div className="h-px bg-white/10 my-4" />
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                   <div className="flex items-center gap-4 text-white">
                      <div className="w-10 h-10 rounded bg-cyber-purple/20 flex items-center justify-center text-cyber-purple">
                         <User size={20} />
                      </div>
                      <span className="text-lg font-black uppercase tracking-tighter">My Dashboard</span>
                   </div>
                </Link>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
