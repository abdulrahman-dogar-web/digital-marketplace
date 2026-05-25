"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
    "INITIALIZING NEURAL LINK...",
    "ESTABLISHING SECURE PROTOCOLS...",
    "LOADING CYBERNETIC ASSETS...",
    "DECRYPTING MARKETPLACE CORE...",
    "ACCESS GRANTED: WELCOME TO CYBERNEST.",
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < messages.length) {
        setLogs(prev => [...prev, messages[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-cyber-black z-[200] flex flex-col items-center justify-center font-mono p-8">
      <div className="max-w-md w-full">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-cyber-blue text-4xl font-bold mb-8 text-center tracking-[0.2em]"
        >
          CYBERNEST
        </motion.div>

        <div className="space-y-2">
          {logs.map((log, i) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={i}
              className="text-cyber-blue/80 text-sm flex gap-4"
            >
              <span className="text-cyber-blue/40">[{new Date().toLocaleTimeString()}]</span>
              <span>{log}</span>
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-cyber-blue"
          />
        </div>
      </div>

      {/* Cinematic background glitch */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="w-full h-full bg-cyber-grid animate-pulse" />
      </div>
    </div>
  );
};
