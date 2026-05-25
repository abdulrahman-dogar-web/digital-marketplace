"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { X, Send, Bot } from 'lucide-react';
import { useAIStore } from '@/store/useAIStore';
import { cn } from '@/lib/utils';

const AIOrb = () => {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00f2ff" />
      <Sphere args={[1, 64, 64]} scale={2.4}>
        <MeshDistortMaterial
          color="#00f2ff"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#00f2ff"
          emissiveIntensity={0.5}
          wireframe
        />
      </Sphere>
    </Canvas>
  );
};

export const CyberNestAI = () => {
  const { isOpen, toggleAI, messages, addMessage, isTyping, setTyping } = useAIStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage({
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    });

    setInput('');
    setTyping(true);

    // Simulate AI response
    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've analyzed your request for "${input}". My neural circuits suggest exploring our legendary automation packs. Shall I direct you to the hidden vault?`,
        timestamp: new Date(),
      });
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-20 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 right-0 w-[400px] h-[600px] glass-panel rounded-2xl border border-cyber-blue/30 flex flex-col shadow-[0_0_50px_rgba(0,242,255,0.15)] overflow-hidden"
          >
            {/* AI Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-cyber-blue/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase">CyberNest AI Neural Link</span>
              </div>
              <button onClick={toggleAI} className="text-cyber-blue/60 hover:text-cyber-blue">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'max-w-[80%] p-3 rounded-lg text-sm',
                    msg.role === 'assistant'
                      ? 'bg-cyber-blue/10 border border-cyber-blue/20 self-start text-cyber-blue'
                      : 'bg-white/5 border border-white/10 self-end ml-auto text-white'
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div className="bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue p-3 rounded-lg text-xs animate-pulse inline-block">
                  Processing neural patterns...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Initialize command..."
                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-cyber-blue/50"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-cyber-blue/20 text-cyber-blue rounded-sm hover:bg-cyber-blue/30 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Orb Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAI}
        className="w-20 h-20 relative group"
      >
        <div className="absolute inset-0 bg-cyber-blue/20 rounded-full blur-xl group-hover:bg-cyber-blue/40 transition-all" />
        <div className="relative w-full h-full flex items-center justify-center">
          <AIOrb />
          <Bot className="absolute text-cyber-blue" size={32} />
        </div>
      </motion.button>
    </div>
  );
};
