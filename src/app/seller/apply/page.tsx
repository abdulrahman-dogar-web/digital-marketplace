"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Send, FileText, Globe, Info } from 'lucide-react';
import Link from 'next/link';

export default function SellerApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    portfolio_url: '',
    experience_summary: '',
    assets_type: '',
    agreement: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <GlobalLayout>
      <div className="min-h-screen flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Operator Onboarding</h1>
            <p className="text-white/40 font-mono uppercase tracking-[0.3em] text-[10px]">Begin your professional seller journey</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <GlassCard className="p-10">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 ml-1 flex items-center gap-2">
                        <Globe size={14} className="text-cyber-blue" />
                        Neural Portfolio / Professional Link
                      </label>
                      <input
                        type="url"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors font-mono"
                        placeholder="https://behance.net/operator_x"
                        value={formData.portfolio_url}
                        onChange={(e) => setFormData({...formData, portfolio_url: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 ml-1 flex items-center gap-2">
                        <FileText size={14} className="text-cyber-purple" />
                        Experience Summary & Asset Specialization
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-sm focus:outline-none focus:border-cyber-purple/50 transition-colors"
                        placeholder="Describe your digital expertise..."
                        value={formData.experience_summary}
                        onChange={(e) => setFormData({...formData, experience_summary: e.target.value})}
                      />
                    </div>

                    <div className="p-6 rounded bg-cyber-blue/5 border border-cyber-blue/20">
                      <div className="flex gap-4 items-start">
                        <Info className="text-cyber-blue shrink-0" size={20} />
                        <div className="space-y-3">
                          <p className="text-xs text-white/70 leading-relaxed font-bold uppercase tracking-widest">Operator Agreement</p>
                          <ul className="text-[10px] text-white/40 space-y-2 uppercase tracking-widest leading-relaxed">
                            <li>• Sellers must undergo manual identity verification.</li>
                            <li>• A 15% nexus commission applies to all successful transactions.</li>
                            <li>• Intellectual property must be strictly verified.</li>
                          </ul>
                          <label className="flex items-center gap-3 cursor-pointer group pt-2">
                            <input
                              type="checkbox"
                              required
                              className="w-4 h-4 rounded border-white/20 bg-transparent text-cyber-blue focus:ring-0"
                              checked={formData.agreement}
                              onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                            />
                            <span className="text-[10px] text-white/60 group-hover:text-white transition-colors">I accept the Nexus Protocol Terms</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <NeonButton type="submit" variant="cyan" className="w-full py-5 text-sm uppercase">
                      Submit Neural Application
                    </NeonButton>
                  </form>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <GlassCard className="p-16 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20 mb-8">
                    <Send className="text-cyber-blue" size={48} />
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Application Transmitted</h2>
                  <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-10">
                    Your operator credentials have been sent to the Nexus Admin for manual review. You will receive an alert once your node is authorized.
                  </p>
                  <Link href="/dashboard">
                    <NeonButton variant="cyan" className="px-10 py-4 text-xs">Return to Dashboard</NeonButton>
                  </Link>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GlobalLayout>
  );
}
