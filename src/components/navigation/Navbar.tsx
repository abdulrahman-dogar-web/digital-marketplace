"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Search, Globe, Shield, Zap, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { items } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Market', href: '/marketplace', icon: Globe },
    { label: 'Vault', href: '/marketplace/vault', icon: Shield },
    { label: 'Lore', href: '/lore', icon: Zap },
    { label: 'Elite', href: '/leaderboard', icon: Terminal },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[400] transition-all duration-500",
        scrolled ? "py-3 bg-black/60 backdrop-blur-xl border-b border-cyber-blue/20" : "py-6 bg-transparent"
      )}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 bg-cyber-blue/20 rounded-lg blur-lg group-hover:bg-cyber-blue/40 transition-all" />
              <div className="relative w-12 h-12 bg-cyber-black border border-cyber-blue/50 rounded flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                <span className="text-cyber-blue font-black text-2xl tracking-tighter">N</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black uppercase tracking-tighter text-2xl leading-none group-hover:text-cyber-blue transition-colors">CyberNest</span>
              <span className="text-[8px] text-cyber-blue/60 font-mono uppercase tracking-[0.4em] leading-none mt-1">Digital Civilization</span>
            </div>
          </Link>

          {/* Desktop Navigation Nodes */}
          <div className="hidden lg:flex items-center gap-1 p-1 glass-panel border-white/10 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 relative group",
                      isActive ? "text-black" : "text-white/40 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full shadow-[0_0_20px_rgba(0,242,255,0.5)]"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <link.icon size={12} className={cn("transition-colors", isActive ? "text-black" : "group-hover:text-cyber-blue")} />
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-4">
            <Link href="/marketplace/search" className="hidden sm:flex p-3 glass-panel border-white/10 rounded-full hover:bg-white/5 transition-all text-white/40 hover:text-cyber-blue group">
              <Search size={18} className="group-hover:scale-110 transition-transform" />
            </Link>

            <Link href="/cart" className="p-3 glass-panel border-white/10 rounded-full hover:bg-white/5 transition-all text-white/40 hover:text-cyber-blue relative group">
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              {items.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.5)]"
                >
                  {items.length}
                </motion.span>
              )}
            </Link>

            <Link href="/dashboard" className="hidden md:flex items-center gap-3 pl-2 pr-6 py-2 glass-panel border border-white/10 rounded-full hover:bg-cyber-blue/10 transition-all group hover:border-cyber-blue/50">
              <div className="w-9 h-9 rounded-full bg-cyber-blue/10 flex items-center justify-center text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all border border-cyber-blue/20 shadow-inner">
                <User size={18} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/80 group-hover:text-cyber-blue">Neural Node</span>
                <span className="text-[7px] text-white/30 uppercase font-mono tracking-tighter">Access Dashboard</span>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 glass-panel border-white/10 rounded-full text-white/60 hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[350] bg-black/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[300px] z-[500] bg-cyber-black border-l border-white/10 p-8 flex flex-col lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="text-xs font-black text-cyber-blue uppercase tracking-[0.3em]">Menu Selection</div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-4 text-white group">
                      <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all">
                        <link.icon size={22} />
                      </div>
                      <span className="text-xl font-black uppercase tracking-tighter group-hover:text-cyber-blue transition-colors">{link.label}</span>
                    </div>
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-4" />
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-4 text-white group">
                    <div className="w-12 h-12 rounded bg-cyber-purple/20 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple group-hover:bg-cyber-purple group-hover:text-white transition-all">
                      <User size={22} />
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter group-hover:text-cyber-purple transition-colors">My Node</span>
                  </div>
                </Link>
              </div>

              <div className="mt-auto">
                <div className="p-4 glass-panel border border-cyber-blue/20 rounded bg-cyber-blue/5">
                   <div className="text-[8px] uppercase tracking-widest text-cyber-blue mb-2">System Status</div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono text-white/60">CONNECTED_VIA_NEXUS</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
