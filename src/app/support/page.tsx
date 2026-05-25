"use client";

import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Search, MessageCircle, Mail, HelpCircle, FileQuestion, BookOpen, AlertCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <GlobalLayout>
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Neural Support Hub</h1>
          <p className="text-white/40 font-mono uppercase tracking-[0.3em] text-[10px]">Resolving subspace connectivity & asset inquiries</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={24} />
            <input
              type="text"
              placeholder="Scan Knowledge Base..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-16 pr-8 py-5 text-lg focus:outline-none focus:border-cyber-blue/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: 'Nexus FAQ', desc: 'Common transmission errors and solutions.', icon: FileQuestion, color: 'text-cyber-blue' },
            { title: 'Operator Manual', desc: 'Guide for selling neural assets.', icon: BookOpen, color: 'text-cyber-purple' },
            { title: 'System Status', desc: 'Live monitoring of nexus nodes.', icon: AlertCircle, color: 'text-cyber-pink' }
          ].map((card, i) => (
            <GlassCard key={i} className="p-8 text-center hover:border-cyber-blue/30 transition-all cursor-pointer group">
               <card.icon className={`${card.color} mx-auto mb-6 group-hover:scale-110 transition-transform`} size={32} />
               <h3 className="font-bold uppercase tracking-widest text-white mb-2">{card.title}</h3>
               <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">{card.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-10 flex items-center gap-3">
            <HelpCircle className="text-cyber-blue" size={20} />
            Frequent Neural Requests
          </h2>
          <div className="space-y-4">
            {[
              { q: 'How do I download my acquired assets?', a: 'Once payment is verified, your products will appear in your User Dashboard under "Acquisitions". Simply click "Transmit" to download the ZIP/PDF.' },
              { q: 'What is the "Nexus Protocol Fee"?', a: 'A standard 15% commission applied to seller payouts to maintain global node infrastructure and support the Nexus Council.' },
              { q: 'Can I refund a Legendary asset?', a: 'Legendary assets are unique neural signatures. Refunds are only granted if the asset file is corrupted and verified by an Admin within 24 hours.' },
              { q: 'How do I reach the Nexus Council?', a: 'For critical subspace errors, use the live chat interface below or transmit a frequency to council@cybernest.io.' }
            ].map((faq, i) => (
              <GlassCard key={i} className="p-6">
                <h4 className="font-bold text-cyber-blue uppercase text-sm mb-3">{faq.q}</h4>
                <p className="text-white/60 text-xs leading-relaxed uppercase tracking-widest">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <GlassCard className="p-10 border-cyber-blue/20 bg-cyber-blue/5">
              <MessageCircle className="text-cyber-blue mb-6" size={40} />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Neural Chat</h3>
              <p className="text-white/40 text-sm mb-8 uppercase tracking-widest leading-relaxed">Connect with a support node in real-time. Average response latency: 4ms.</p>
              <NeonButton variant="cyan" className="w-full py-4 text-xs">Initialize Chat</NeonButton>
           </GlassCard>

           <GlassCard className="p-10 border-cyber-purple/20 bg-cyber-purple/5">
              <Mail className="text-cyber-purple mb-6" size={40} />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Subspace Inbox</h3>
              <p className="text-white/40 text-sm mb-8 uppercase tracking-widest leading-relaxed">For non-critical inquiries and partnership transmissions.</p>
              <NeonButton variant="purple" className="w-full py-4 text-xs">Transmit Mail</NeonButton>
           </GlassCard>
        </div>
      </div>
    </GlobalLayout>
  );
}
