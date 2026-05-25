"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Shield, CreditCard, Upload, CheckCircle } from 'lucide-react';

// This would normally come from an API
const PRODUCTS_DB: Record<string, { name: string, price: number }> = {
  '1': { name: 'Neural Automation Suite', price: 299 },
  '2': { name: 'Cyber Nexus Prompt Pack', price: 49 },
  '3': { name: 'Holographic UI Kit', price: 89 },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('productId');
  const product = productId ? PRODUCTS_DB[productId] : null;

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');
  const [txId, setTxId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!product && productId) {
      router.push('/marketplace');
    }
  }, [product, productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStep(3);
    setIsSubmitting(false);
  };

  if (!product) return null;

  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Secure Acquisition Flow</h1>
        <div className="flex justify-center items-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border ${
                step >= s ? 'bg-cyber-blue border-cyber-blue text-black' : 'border-white/20 text-white/20'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-px ${step > s ? 'bg-cyber-blue' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <CreditCard className="text-cyber-blue" size={20} />
                Select Method
              </h2>
              <div className="space-y-4">
                {['Pakistani Bank', 'Easypaisa', 'JazzCash', 'Binance'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`w-full p-4 rounded border text-left transition-all ${
                      method === m ? 'border-cyber-blue bg-cyber-blue/10' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="font-bold">{m}</div>
                    <div className="text-[10px] text-white/40 uppercase mt-1">Instant Verification Available</div>
                  </button>
                ))}
              </div>
              <NeonButton
                disabled={!method}
                onClick={() => setStep(2)}
                className="w-full mt-8 py-4 text-sm"
              >
                Continue to Payment
              </NeonButton>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard className="p-6 border-white/5 bg-white/5">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Summary</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-lg font-bold">{product.name}</div>
                    <div className="text-[10px] text-cyber-blue uppercase font-mono">ASSET_ID: {productId}</div>
                  </div>
                  <div className="text-2xl font-mono text-cyber-blue">${product.price}</div>
                </div>
              </GlassCard>
              <div className="p-6 rounded bg-cyber-blue/5 border border-cyber-blue/20 flex gap-4">
                <Shield className="text-cyber-blue shrink-0" size={24} />
                <p className="text-xs text-white/60 leading-relaxed">
                  Your acquisition is protected by the CyberNest Escrow Protocol. Funds are only released once the asset is successfully delivered to your neural vault.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto"
          >
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Verify Transaction</h2>
              <div className="p-6 bg-white/5 rounded mb-8 border border-white/10">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Transfer To:</div>
                <div className="font-mono text-cyber-blue font-bold text-lg mb-1">0345-1234567</div>
                <div className="text-xs text-white/60">CyberNest Global Nexus (Private Limited)</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Transaction ID</label>
                  <input
                    type="text"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    placeholder="Enter ID from your receipt"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-cyber-blue/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 ml-1">Payment Screenshot</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-sm hover:border-cyber-blue/30 cursor-pointer transition-colors bg-white/5">
                    <Upload className="text-white/20 mb-2" size={24} />
                    <span className="text-xs text-white/40">{screenshot ? screenshot.name : 'Click to upload proof'}</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                      required
                    />
                  </label>
                </div>

                <NeonButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm"
                >
                  {isSubmitting ? 'Verifying Neural Patterns...' : 'Submit Verification'}
                </NeonButton>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <div className="inline-block p-6 rounded-full bg-cyber-green/10 mb-8 border border-cyber-green/20">
              <CheckCircle size={64} className="text-cyber-green" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Verification Sent</h2>
            <p className="text-white/60 mb-10 leading-relaxed">
              Your payment is currently being reviewed by the Nexus Admin. You will receive an automated transmission (Email & WhatsApp) once the asset is unlocked.
            </p>
            <div className="space-y-4">
              <NeonButton
                variant="cyan"
                onClick={() => router.push('/')}
                className="w-full py-4 text-sm"
              >
                Return to Home
              </NeonButton>
              <a
                href={`https://wa.me/923451234567?text=I%20bought%20${product.name}%20using%20${method}%20for%20${product.price}.%20Transaction%20ID:%20${txId}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 text-[10px] uppercase tracking-widest font-bold text-cyber-green hover:bg-cyber-green/5 rounded transition-all"
              >
                Confirm via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <GlobalLayout>
      <Suspense fallback={
        <div className="container mx-auto px-6 py-32 text-center text-cyber-blue font-mono animate-pulse">
          LOADING ACQUISITION PROTOCOLS...
        </div>
      }>
        <CheckoutForm />
      </Suspense>
    </GlobalLayout>
  );
}
