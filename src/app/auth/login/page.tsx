"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Shield, Lock, User, Chrome } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUserStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Set a mock session cookie for the middleware
    document.cookie = "cybernest_session=active; path=/; max-age=3600";

    // Simple password system as requested
    if (username === '1' && password === '1') {
      setUser({
        id: 'admin-1',
        username: 'Admin_Nexus',
        email: 'admin@cybernest.io',
        role: 'admin',
        xp: 9999,
        rank: 'Nexus Master',
        badges: ['SYSTEM_CREATOR'],
        created_at: new Date().toISOString()
      });
      router.push(searchParams.get('callbackUrl') || '/admin/dashboard');
    } else if (username === 'seller' && password === 'seller') {
      setUser({
        id: 'seller-1',
        username: 'Operator_X',
        email: 'seller@cybernest.io',
        role: 'seller',
        xp: 1240,
        rank: 'Cyber Agent',
        badges: ['EARLY_ADOPTER'],
        created_at: new Date().toISOString()
      });
      router.push(searchParams.get('callbackUrl') || '/seller/dashboard');
    } else {
      setError('NEURAL_MATCH_FAILURE: Credentials not found in central database.');
    }
  };

  const handleGoogleLogin = () => {
     // Mocking Google login trigger
     alert("Redirecting to Google Auth node... (Requires Supabase Google Provider configuration)");
     // In production: supabase.auth.signInWithOAuth({ provider: 'google' })
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-cyber-blue/10 mb-6 border border-cyber-blue/20">
            <Shield size={40} className="text-cyber-blue" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Neural Authentication</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Establish secure connection to the nexus</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Identity Tag</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors"
                  placeholder="Username"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-cyber-pink/10 border border-cyber-pink/30 rounded text-cyber-pink text-[10px] font-mono leading-relaxed"
              >
                ERROR: {error}
              </motion.div>
            )}

            <NeonButton type="submit" variant="cyan" className="w-full py-4 text-sm mt-4">
              Initialize Login
            </NeonButton>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-cyber-black px-4 text-white/30">Or Connect via Google</span></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 glass-panel border border-white/10 rounded-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest text-white/80"
          >
            <Chrome size={18} className="text-cyber-blue" />
            Supabase Google Auth
          </button>
        </GlassCard>

        <div className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-widest font-mono">
          IP: 192.168.1.104 • Status: Encrypted • Port: 8080
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <GlobalLayout>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-cyber-blue font-mono animate-pulse">
          ESTABLISHING NEURAL LINK...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </GlobalLayout>
  );
}
