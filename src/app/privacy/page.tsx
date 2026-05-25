"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';

export default function PrivacyPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="mb-16">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Neural Data Privacy</h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Ensuring Subspace Anonymity & Data Integrity</p>
        </div>

        <GlassCard className="p-10 space-y-12 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-cyber-blue mb-6">Encryption Standards</h2>
            <p className="uppercase text-[10px] tracking-widest mb-4">All transmissions within the CyberNest nexus are protected by AES-256 neural-grade encryption. We do not store raw access keys; all identities are salted and hashed within our secure vaults.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-cyber-purple mb-6">Data Collection</h2>
            <p className="uppercase text-[10px] tracking-widest mb-4">We collect minimal data required for node functionality: Neural Identity (Email), Transaction History, and XP Progression. We do not track your browsing behavior outside of the CyberNest domain.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-cyber-pink mb-6">Third-Party Nodes</h2>
            <p className="uppercase text-[10px] tracking-widest mb-4">We do not sell neural data to external corporations. Identity verification via Pakistani Banks or Binance is handled through secure subspace tunnels that never expose your full financial profile to our servers.</p>
          </section>

          <div className="pt-12 border-t border-white/5">
             <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] text-center italic">YOUR NEURAL PRIVACY IS THE FOUNDATION OF THE DIGITAL CIVILIZATION.</p>
          </div>
        </GlassCard>
      </div>
    </GlobalLayout>
  );
}
