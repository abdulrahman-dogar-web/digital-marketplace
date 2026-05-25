"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Mail, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <GlobalLayout>
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-full bg-cyber-purple/10 mb-6 border border-cyber-purple/20">
              <Shield size={40} className="text-cyber-purple" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Neural Recovery</h1>
            <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Restore access to the nexus</p>
          </div>

          <GlassCard className="p-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <p className="text-white/60 text-xs leading-relaxed uppercase tracking-widest text-center">
                    Enter your registered neural frequency to receive a reset transmission.
                  </p>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Email Frequency</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        type="email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-purple/50 transition-colors"
                        placeholder="nexus@cybernest.io"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <NeonButton type="submit" variant="purple" className="w-full py-4 text-sm mt-4">
                    Send Reset Link
                  </NeonButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <CheckCircle size={48} className="text-cyber-green mx-auto mb-6" />
                  <h2 className="text-xl font-bold uppercase tracking-widest mb-4 text-white">Transmission Sent</h2>
                  <p className="text-white/40 text-xs leading-relaxed uppercase tracking-widest mb-8">
                    Check your subspace inbox for further instructions. Recovery node active for 15 minutes.
                  </p>
                  <Link href="/auth/login">
                    <NeonButton variant="purple" className="w-full py-4 text-xs">Return to Login</NeonButton>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          <div className="mt-8 text-center">
            <Link href="/auth/login" className="text-xs text-white/40 hover:text-cyber-purple transition-colors flex items-center justify-center gap-2 uppercase tracking-widest">
              <ArrowLeft size={14} /> Back to neural link
            </Link>
          </div>
        </motion.div>
      </div>
    </GlobalLayout>
  );
}
