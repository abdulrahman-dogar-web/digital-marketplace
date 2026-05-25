"use client";

import { ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CyberNestAI } from '../ai/CyberNestAI';
import { EasterEggSystem } from './EasterEggSystem';
import { Navbar } from '../navigation/Navbar';

interface Particle {
  id: number;
  left: string;
  duration: number;
  delay: number;
  startY: number;
}

export const GlobalLayout = ({ children }: { children: ReactNode }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Wrap in requestAnimationFrame to avoid synchronous setState lint warning in some environments
    // or just let it be, but let's try to be cleaner.
    const frame = requestAnimationFrame(() => {
      const newParticles = [...Array(20)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
        startY: Math.random() * 1000
      }));
      setParticles(newParticles);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-white relative">
      <Navbar />
      {/* Background Elements */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-cyber-black/50 to-cyber-black pointer-events-none" />

      {/* Floating Particles Simulation */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-20"
            animate={{
              y: [p.startY, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{
              left: p.left,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* AI Assistant */}
      <CyberNestAI />

      {/* Easter Egg System */}
      <EasterEggSystem />

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-4 glass-panel border-t border-white/5 z-50 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-cyber-blue/60">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse" />
            System Online
          </span>
          <span>Nexus Protocol: v4.2.0</span>
        </div>
        <div className="flex gap-6">
          <span>Encryption: AES-256</span>
          <span>Latency: 12ms</span>
        </div>
      </footer>
    </div>
  );
};
