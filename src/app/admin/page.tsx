"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import {
  Shield,
  Terminal,
  Key,
  Fingerprint,
  Eye,
  AlertTriangle
} from 'lucide-react';
import AdminDashboard from './dashboard/page';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [identity, setIdentity] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setError('');

    setTimeout(() => {
      if (identity === '1' && passkey === '1') {
        setIsAuthenticated(true);
      } else {
        setError('NEURAL_MISMATCH: Access Denied. Identity scrubbed.');
        setIsScanning(false);
      }
    }, 2000);
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <GlobalLayout>
      <div className="min-h-[90vh] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-purple/5 via-transparent to-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl"
        >
          <div className="text-center mb-16">
            <div className="inline-block p-6 rounded-2xl bg-cyber-purple/10 border-2 border-cyber-purple mb-8 relative group">
               <div className="absolute -inset-4 bg-cyber-purple/20 rounded-3xl blur-2xl group-hover:bg-cyber-purple/40 transition-all animate-pulse" />
               <Shield size={64} className="text-cyber-purple relative z-10" />
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-white">Command Access</h1>
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.5em]">Nexus Master Authorization Required</p>
          </div>

          <GlassCard className="p-12 border-2 border-white/10 relative overflow-hidden">
             {/* Security Visuals */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />
             <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent" />

             {isScanning ? (
                <div className="py-20 text-center space-y-8">
                   <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 border-4 border-cyber-blue rounded-full animate-ping opacity-20" />
                      <div className="absolute inset-0 border-2 border-cyber-purple rounded-full animate-spin border-t-transparent" />
                      <div className="w-full h-full flex items-center justify-center">
                         <Fingerprint size={48} className="text-white animate-pulse" />
                      </div>
                   </div>
                   <div className="text-lg font-mono text-cyber-blue animate-pulse font-black uppercase tracking-widest">Scanning Biometrics...</div>
                </div>
             ) : (
                <form onSubmit={handleLogin} className="space-y-8">
                   <div className="space-y-6">
                      <div className="relative group">
                         <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-cyber-purple transition-colors">Identity Node</label>
                         <div className="relative">
                            <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-purple transition-colors" size={20} />
                            <input
                               type="text"
                               value={identity}
                               onChange={(e) => setIdentity(e.target.value)}
                               className="w-full bg-white/5 border-2 border-white/10 rounded-sm pl-12 pr-6 py-5 text-sm focus:outline-none focus:border-cyber-purple font-black text-white uppercase tracking-widest transition-all"
                               placeholder="Admin ID"
                               required
                            />
                         </div>
                      </div>

                      <div className="relative group">
                         <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-cyber-blue transition-colors">Neural Passkey</label>
                         <div className="relative">
                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-blue transition-colors" size={20} />
                            <input
                               type="password"
                               value={passkey}
                               onChange={(e) => setPasskey(e.target.value)}
                               className="w-full bg-white/5 border-2 border-white/10 rounded-sm pl-12 pr-6 py-5 text-sm focus:outline-none focus:border-cyber-blue font-black text-white tracking-widest transition-all"
                               placeholder="••••••••"
                               required
                            />
                         </div>
                      </div>
                   </div>

                   {error && (
                      <motion.div
                        initial={{ x: -10 }} animate={{ x: 0 }}
                        className="p-5 bg-cyber-pink/10 border-2 border-cyber-pink/30 rounded-sm text-cyber-pink text-xs font-black uppercase tracking-widest flex items-center gap-4"
                      >
                         <AlertTriangle size={20} />
                         {error}
                      </motion.div>
                   )}

                   <NeonButton type="submit" variant="purple" className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(188,19,254,0.3)]">
                      Establish Master Link
                   </NeonButton>
                </form>
             )}
          </GlassCard>

          <div className="mt-12 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/20 px-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                SECURE_LINE: ACTIVE
             </div>
             <div className="flex items-center gap-2">
                <Eye size={12} />
                MONITORING_NODES: 12
             </div>
          </div>
        </motion.div>
      </div>
    </GlobalLayout>
  );
}
