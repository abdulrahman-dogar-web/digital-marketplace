"use client";

import Link from 'next/link';
import { Github, Twitter, Instagram, Mail, Shield, Zap, Globe } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Ecosystem',
      links: [
        { label: 'Marketplace', href: '/marketplace' },
        { label: 'Hidden Vault', href: '/marketplace/vault' },
        { label: 'Leaderboard', href: '/leaderboard' },
        { label: 'Encrypted Lore', href: '/lore' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Support Hub', href: '/support' },
        { label: 'Manuals', href: '/support' },
        { label: 'System Status', href: '/support' },
        { label: 'Dispute Node', href: '/support' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Nexus Terms', href: '/terms' },
        { label: 'Privacy Protocol', href: '/privacy' },
        { label: 'Cookie Policy', href: '/privacy' },
        { label: 'License Archive', href: '/terms' },
      ]
    }
  ];

  return (
    <footer className="relative z-10 pt-20 pb-12 border-t border-white/5 bg-cyber-black overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyber-blue/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyber-blue rounded flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)] group-hover:scale-110 transition-transform">
                <span className="text-black font-black text-xl">N</span>
              </div>
              <span className="text-white font-black uppercase tracking-tighter text-2xl group-hover:text-cyber-blue transition-colors">CyberNest</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8 uppercase tracking-widest">
              Architecting the next generation of digital civilization. A decentralized nexus for elite neural assets and autonomous AI tools.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Mail, href: 'mailto:council@cybernest.io' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-cyber-blue hover:border-cyber-blue/30 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Sections */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/80 mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-[10px] uppercase tracking-widest text-white/40 hover:text-cyber-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-white/20 font-mono">
            <span>© {currentYear} CyberNest Protocol</span>
            <span className="hidden md:block">|</span>
            <span className="flex items-center gap-2"><Shield size={10} /> Secure Node: Active</span>
            <span className="hidden md:block">|</span>
            <span className="flex items-center gap-2"><Zap size={10} /> Energy: Optimized</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded text-[8px] font-bold text-cyber-blue uppercase tracking-widest">
              v4.2.0-STABLE
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-bold text-white/40 uppercase tracking-widest">
              <Globe size={10} /> Subspace Network
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
