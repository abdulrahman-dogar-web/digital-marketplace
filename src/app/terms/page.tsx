"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';

export default function TermsPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="mb-16">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Nexus Protocol Terms</h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Effective Date: 2025.02.15 • Version 4.2.0</p>
        </div>

        <GlassCard className="p-10 space-y-12 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-cyber-blue mb-6">1. Neural Identity</h2>
            <p className="uppercase text-[10px] tracking-widest mb-4">Users must provide accurate neural signatures (Email) during signup. Multiple unauthorized identities per human node are strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-cyber-purple mb-6">2. Asset Acquisition</h2>
            <p className="uppercase text-[10px] tracking-widest mb-4">All digital acquisitions on CyberNest are final. The escrow system holds units until verification. Once a neural link (download) is established, units are released to the seller.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-cyber-pink mb-6">3. Operator Responsibility</h2>
            <p className="uppercase text-[10px] tracking-widest mb-4">Sellers (Operators) must own 100% of the intellectual property for assets uploaded to the nexus. Any detected piracy results in immediate node termination and XP reset.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-cyber-blue mb-6">4. Commission & Fees</h2>
            <p className="uppercase text-[10px] tracking-widest mb-4">A standard 15% Nexus protocol fee is deducted from all sales. This fee is non-negotiable and covers global node maintenance and encryption protocols.</p>
          </section>

          <div className="pt-12 border-t border-white/5">
             <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] text-center italic">FAILURE TO COMPLY WITH NEXUS PROTOCOL WILL RESULT IN PERMANENT NEURAL DAMPENING.</p>
          </div>
        </GlassCard>
      </div>
    </GlobalLayout>
  );
}
