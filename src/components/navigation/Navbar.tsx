"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Search, Globe, Shield, Zap, Terminal, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { NeonButton } from '../ui/NeonButton';

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
        scrolled ? "py-2 bg-black/80 backdrop-blur-2xl border-b border-cyber-blue/30 shadow-[0_0_30px_rgba(0,0,0,0.8)]" : "py-6 bg-transparent"
      )}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-5">
            <div className="relative">
              <div className="absolute -inset-3 bg-cyber-blue/25 rounded-lg blur-xl group-hover:bg-cyber-blue/50 transition-all duration-500" />
              <div className="relative w-14 h-14 bg-cyber-black border-2 border-cyber-blue rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-cyber-blue font-black text-3xl tracking-tighter">N</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black uppercase tracking-tighter text-3xl leading-none group-hover:text-cyber-blue transition-colors duration-300">CyberNest</span>
              <span className="text-[10px] text-cyber-blue font-bold uppercase tracking-[0.5em] leading-none mt-2 opacity-80">Digital Civilization</span>
            </div>
          </Link>

          {/* Desktop Navigation Nodes */}
          <div className="hidden xl:flex items-center gap-2 p-1.5 glass-panel border-white/20 rounded-full bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 relative group",
                      isActive ? "text-black" : "text-white/60 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-main"
                        className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full shadow-[0_0_25px_rgba(0,242,255,0.6)]"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <link.icon size={14} className={cn("transition-colors", isActive ? "text-black" : "group-hover:text-cyber-blue")} />
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Actions & Auth */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 pr-6 border-r border-white/10">
               <Link href="/auth/login">
                  <button className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-cyber-blue transition-colors flex items-center gap-2">
                    <LogIn size={14} />
                    Login
                  </button>
               </Link>
               <Link href="/auth/signup">
                  <NeonButton variant="purple" className="px-5 py-2 text-[9px]">Join Nexus</NeonButton>
               </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/marketplace/search" className="p-3.5 glass-panel border-white/20 rounded-full hover:bg-white/10 transition-all text-white/60 hover:text-cyber-blue group">
                <Search size={20} className="group-hover:scale-110 transition-transform" />
              </Link>

              <Link href="/cart" className="p-3.5 glass-panel border-white/20 rounded-full hover:bg-white/10 transition-all text-white/60 hover:text-cyber-blue relative group">
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                {items.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-cyber-pink text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.6)]"
                  >
                    {items.length}
                  </motion.span>
                )}
              </Link>

              <Link href="/dashboard" className="hidden lg:flex items-center gap-4 pl-2 pr-6 py-2 glass-panel border-2 border-white/10 rounded-full hover:bg-cyber-blue/10 transition-all group hover:border-cyber-blue/50">
                <div className="w-10 h-10 rounded-full bg-cyber-blue/10 flex items-center justify-center text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all border-2 border-cyber-blue/20 shadow-inner">
                  <User size={20} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/90 group-hover:text-cyber-blue">Neural Node</span>
                  <span className="text-[8px] text-white/40 uppercase font-mono tracking-tighter">Verified_Citizen</span>
                </div>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-3.5 glass-panel border-white/20 rounded-full text-white/60 hover:text-white transition-colors"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
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
              className="fixed inset-0 z-[350] bg-black/90 backdrop-blur-md xl:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[320px] z-[500] bg-cyber-black border-l-2 border-cyber-blue/30 p-10 flex flex-col xl:hidden"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="text-sm font-black text-cyber-blue uppercase tracking-[0.4em]">Grid Selection</div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-5 text-white group">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border-2 border-white/10 flex items-center justify-center text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all duration-500 shadow-lg">
                        <link.icon size={26} />
                      </div>
                      <span className="text-2xl font-black uppercase tracking-tighter group-hover:text-cyber-blue transition-colors">{link.label}</span>
                    </div>
                  </Link>
                ))}

                <div className="h-px bg-white/10 my-6" />

                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                   <div className="flex items-center gap-5 text-white/60 hover:text-white transition-all group">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center"><LogIn size={20} /></div>
                      <span className="text-lg font-black uppercase tracking-widest">Login</span>
                   </div>
                </Link>

                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-5 text-white group">
                    <div className="w-14 h-14 rounded-xl bg-cyber-purple/20 border-2 border-cyber-purple/30 flex items-center justify-center text-cyber-purple group-hover:bg-cyber-purple group-hover:text-white transition-all duration-500 shadow-lg">
                      <User size={26} />
                    </div>
                    <span className="text-2xl font-black uppercase tracking-tighter group-hover:text-cyber-purple transition-colors">My Node</span>
                  </div>
                </Link>
              </div>

              <div className="mt-auto">
                <div className="p-6 glass-panel border-2 border-cyber-blue/30 rounded-2xl bg-cyber-blue/5">
                   <div className="text-[10px] font-black uppercase tracking-widest text-cyber-blue mb-3">Nexus Frequency</div>
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-cyber-green rounded-full animate-pulse shadow-[0_0_10px_#39ff14]" />
                      <span className="text-xs font-mono text-white/80 font-bold tracking-tighter">SECURE_CONNECTION_STABLE</span>
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
