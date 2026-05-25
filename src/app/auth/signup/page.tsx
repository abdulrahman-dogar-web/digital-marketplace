"use client";

import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Shield, Mail, User, Lock, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Creating new citizen node... (Requires Supabase Auth integration)");
  };

  const handleGoogleSignup = () => {
    alert("Redirecting to Google Auth node... (Requires Supabase Google Provider configuration)");
  };

  return (
    <GlobalLayout>
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-full bg-cyber-purple/10 mb-6 border border-cyber-purple/20">
              <Shield size={40} className="text-cyber-purple" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Citizen Registration</h1>
            <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Establish your identity in the civilization</p>
          </div>

          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Identity Tag</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-purple/50 transition-colors"
                    placeholder="Choose Username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Subspace Frequency</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-purple/50 transition-colors"
                    placeholder="nexus@cybernest.io"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-purple/50 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <NeonButton type="submit" variant="purple" className="w-full py-4 text-sm mt-4">
                Initialize Citizenship
              </NeonButton>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-cyber-black px-4 text-white/30">Or Fast-Track via Google</span></div>
            </div>

            <button
              onClick={handleGoogleSignup}
              className="w-full py-4 glass-panel border border-white/10 rounded-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest text-white/80"
            >
              <Chrome size={18} className="text-cyber-purple" />
              Sign up with Google
            </button>

            <div className="mt-8 text-center">
              <Link href="/auth/login" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-cyber-purple transition-colors underline">
                Already have a node? Enter Nexus
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GlobalLayout>
  );
}
