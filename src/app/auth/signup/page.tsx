"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { UserPlus, Mail, Lock, User, Github, Chrome, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempted:', formData);
  };

  return (
    <GlobalLayout>
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-full bg-cyber-blue/10 mb-6 border border-cyber-blue/20">
              <UserPlus size={40} className="text-cyber-blue" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Join the Nexus</h1>
            <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Begin your neural journey</p>
          </div>

          <GlassCard className="p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Identity Tag</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors"
                    placeholder="Choose Username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Neural Frequency (Email)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors"
                    placeholder="nexus@cybernest.io"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="password"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <NeonButton type="submit" variant="cyan" className="w-full py-4 text-sm mt-4">
                Initialize Account
              </NeonButton>
            </form>

            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-cyber-black px-4 text-white/20">Social Sync</span></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-3 glass-panel border border-white/10 rounded hover:bg-white/5 transition-all text-white/60 hover:text-white"><Github size={20} /></button>
                <button className="flex items-center justify-center p-3 glass-panel border border-white/10 rounded hover:bg-white/5 transition-all text-white/60 hover:text-white"><Chrome size={20} /></button>
                <button className="flex items-center justify-center p-3 glass-panel border border-white/10 rounded hover:bg-white/5 transition-all text-white/60 hover:text-white"><MessageSquare size={20} /></button>
              </div>
            </div>
          </GlassCard>

          <p className="text-center text-xs text-white/40">
            Already registered? <Link href="/auth/login" className="text-cyber-blue hover:underline">Connect Neural Link</Link>
          </p>
        </motion.div>
      </div>
    </GlobalLayout>
  );
}
