"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Zap, Globe, Cpu, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 border border-cyber-blue/30 rounded-full text-[10px] uppercase tracking-[0.3em] text-cyber-blue mb-6 bg-cyber-blue/5"
          >
            The CyberNest Vision
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
            Architecting the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink">
              Digital Civilization
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-white/60 text-lg md:text-xl leading-relaxed">
            CyberNest is more than a marketplace. It is a neural nexus designed to bridge the gap between human creativity and autonomous AI potential. We provide the tools for the next generation of internet pioneers.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              title: 'Elite Curation',
              desc: 'Every asset in our marketplace undergoes rigorous neural verification to ensure performance and safety.',
              icon: Shield,
              color: 'text-cyber-blue'
            },
            {
              title: 'Neural Innovation',
              desc: 'We prioritize products that leverage the latest in Large Language Models and autonomous agent frameworks.',
              icon: Cpu,
              color: 'text-cyber-purple'
            },
            {
              title: 'Global Distribution',
              desc: 'Our infrastructure allows for instant transmission of digital assets across the global subspace network.',
              icon: Globe,
              color: 'text-cyber-pink'
            }
          ].map((pillar, i) => (
            <GlassCard key={i} className="p-10 border-white/5 hover:border-cyber-blue/20 transition-all group">
              <pillar.icon className={`${pillar.color} mb-8 group-hover:scale-110 transition-transform`} size={40} />
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{pillar.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">{pillar.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Our Mission</h2>
            <div className="space-y-6 text-white/70">
              <p className="leading-relaxed">
                In the year 2042, the digital landscape was fragmented. The tools for progress were hidden in obscure corners of the web. CyberNest was founded to centralize these resources into a single, secure, and immersive ecosystem.
              </p>
              <p className="leading-relaxed">
                We believe that by empowering individual creators and providing them with legendary-tier AI tools, we can accelerate the evolution of our collective digital reality.
              </p>
            </div>
            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-3xl font-mono font-bold text-cyber-blue">50K+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Active Nodes</div>
              </div>
              <div>
                <div className="text-3xl font-mono font-bold text-cyber-purple">8.4M</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Transmissions</div>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <div className="absolute inset-0 bg-cyber-blue/10 blur-3xl rounded-full animate-pulse" />
            <GlassCard className="aspect-square flex items-center justify-center border-cyber-blue/30 relative overflow-hidden">
               <Zap size={120} className="text-cyber-blue opacity-20 absolute" />
               <div className="text-center p-12">
                  <Target size={64} className="mx-auto text-cyber-blue mb-6" />
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Nexus Priority</div>
                  <div className="text-xl font-bold mt-2">OPTIMIZING HUMAN POTENTIAL</div>
               </div>
            </GlassCard>
          </div>
        </div>

        {/* Team / Community */}
        <div className="text-center">
          <h2 className="text-3xl font-bold uppercase tracking-widest mb-16">Built by the Nexus Council</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((m) => (
              <div key={m} className="group">
                <div className="w-24 h-24 rounded-full bg-white/5 mx-auto mb-6 border border-white/10 group-hover:border-cyber-blue/50 transition-all flex items-center justify-center text-3xl grayscale group-hover:grayscale-0">
                  {m === 1 ? '👑' : m === 2 ? '🛡️' : m === 3 ? '🧪' : '📡'}
                </div>
                <div className="text-sm font-bold uppercase tracking-widest">Council_Node_0{m}</div>
                <div className="text-[10px] text-white/20 uppercase font-mono mt-1">Founding Member</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
