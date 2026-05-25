"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIStore } from '@/store/useAIStore';
import { useUserStore } from '@/store/useUserStore';

const EASTER_EGGS = [
  { phrase: 'nexus_override', reward: 'Unlocked 50% Discount!', xp: 500 },
  { phrase: 'reveal_lore', reward: 'Accessing encrypted files...', xp: 200 },
  { phrase: 'god_mode', reward: 'Visual matrix destabilized.', xp: 1000 },
];

export const EasterEggSystem = () => {
  const [input, setInput] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const { addMessage } = useAIStore();
  const { updateXP } = useUserStore();

  const triggerEgg = useCallback((egg: typeof EASTER_EGGS[0]) => {
    setNotification(egg.reward);
    updateXP(egg.xp);
    addMessage({
      id: Date.now().toString(),
      role: 'assistant',
      content: `EASTER EGG DETECTED: ${egg.phrase.toUpperCase()}. ${egg.reward} Neural XP +${egg.xp}`,
      timestamp: new Date(),
    });

    if (egg.phrase === 'god_mode') {
      document.body.classList.add('glitch-active');
      setTimeout(() => document.body.classList.remove('glitch-active'), 5000);
    }

    setTimeout(() => setNotification(null), 5000);
    setInput('');
  }, [addMessage, updateXP]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] bg-cyber-pink text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,0,255,0.5)] border border-white/20"
        >
          {notification}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
