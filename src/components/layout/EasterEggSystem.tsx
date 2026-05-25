"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIStore } from '@/store/useAIStore';
import { useUserStore } from '@/store/useUserStore';
import { Gift, Zap } from 'lucide-react';

const EASTER_EGGS = [
  { phrase: 'nexus_override', reward: 'Unlocked 50% Discount!', xp: 500, type: 'discount' },
  { phrase: 'reveal_lore', reward: 'Accessing encrypted files...', xp: 200, type: 'vault' },
  { phrase: 'god_mode', reward: 'Visual matrix destabilized.', xp: 1000, type: 'badge' },
  { phrase: 'Sunday_Special', reward: 'Mega 100% Discount Found!', xp: 2000, type: 'discount' },
];

export const EasterEggSystem = () => {
  const [input, setInput] = useState('');
  const [notification, setNotification] = useState<{reward: string, xp: number} | null>(null);
  const { addMessage } = useAIStore();
  const { updateXP } = useUserStore();

  const triggerEgg = useCallback((egg: typeof EASTER_EGGS[0]) => {
    setNotification({ reward: egg.reward, xp: egg.xp });
    updateXP(egg.xp);

    addMessage({
      id: Date.now().toString(),
      role: 'assistant',
      content: `EASTER EGG DETECTED: [${egg.phrase.toUpperCase()}]. Protocol initiated. Neural XP +${egg.xp}. REWARD: ${egg.reward}`,
      timestamp: new Date(),
    });

    if (egg.phrase === 'god_mode') {
      document.body.classList.add('glitch-active');
      setTimeout(() => document.body.classList.remove('glitch-active'), 8000);
    }

    setTimeout(() => setNotification(null), 6000);
    setInput('');
  }, [addMessage, updateXP]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Logic for claiming (one-time claim simulation per session)
      const currentInput = (input + e.key).slice(-20);
      setInput(currentInput);

      EASTER_EGGS.forEach((egg) => {
        if (currentInput.endsWith(egg.phrase)) {
          triggerEgg(egg);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, triggerEgg]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[400] w-full max-w-sm"
        >
          <div className="glass-panel border-cyber-pink/50 bg-cyber-pink/10 p-6 rounded-2xl flex items-center gap-6 shadow-[0_0_50px_rgba(255,0,255,0.3)]">
            <div className="w-16 h-16 rounded-full bg-cyber-pink/20 flex items-center justify-center border border-cyber-pink/30 shrink-0">
              <Gift className="text-cyber-pink animate-bounce" size={32} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-pink mb-1">Secret Discovered</div>
              <div className="text-white font-bold text-sm leading-tight mb-2">{notification.reward}</div>
              <div className="flex items-center gap-2 text-cyber-blue font-mono text-[10px] font-bold">
                <Zap size={10} /> +{notification.xp} XP
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
