"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { X, Send, Bot, Search, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { useAIStore } from '@/store/useAIStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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

  const generateAIResponse = (userQuery: string) => {
    const query = userQuery.toLowerCase();

    if (query.includes('find') || query.includes('search') || query.includes('show me')) {
      return {
        content: "I've scanned the distribution nodes for your query. Based on your neural profile, I recommend the Neural Automation Suite. It's currently trending at 98% compatibility.",
        link: { label: 'View Automation Suite', url: '/marketplace/product/1' }
      };
    }

    if (query.includes('vault') || query.includes('hidden') || query.includes('secret')) {
      return {
        content: "The Hidden Vault requires Level 5 decryption. I can bypass the standard gateway for you this once. Use caution, these assets are highly volatile.",
        link: { label: 'Enter Hidden Vault', url: '/marketplace/vault' }
      };
    }

    if (query.includes('price') || query.includes('cheap') || query.includes('cost')) {
      return {
        content: "I've analyzed market fluctuations. The Cyber Nexus Prompt Pack offers the highest neural-value-to-unit ratio currently available.",
        link: { label: 'View Prompt Pack', url: '/marketplace/product/2' }
      };
    }

    if (query.includes('help') || query.includes('how to') || query.includes('faq')) {
      return {
        content: "I am CyberNest, your neural interface for this marketplace. I can help you find legendary assets, explain rarity scores, and guide your acquisition sequence. What protocol shall we initiate?",
      };
    }

    return {
      content: "Neural patterns analyzed. I suggest exploring our trending daily drops to stay ahead of the nexus curve. Shall I redirect you to the live feed?",
      link: { label: 'Explore Trending', url: '/marketplace/trending' }
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage({
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    });

    const userInput = input;
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(userInput);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        link: response.link
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
            className="absolute bottom-24 right-0 w-[420px] h-[650px] glass-panel rounded-2xl border border-cyber-blue/30 flex flex-col shadow-[0_0_80px_rgba(0,242,255,0.2)] overflow-hidden"
          >
            {/* AI Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-cyber-blue/5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-cyber-blue rounded-full animate-pulse shadow-[0_0_10px_#00f2ff]" />
                <div>
                  <span className="text-sm font-black tracking-widest uppercase block">CyberNest Neural Link</span>
                  <span className="text-[8px] text-white/30 uppercase tracking-[0.3em]">Protocol v4.2.0 • Active</span>
                </div>
              </div>
              <button onClick={toggleAI} className="text-white/20 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.length === 0 && (
                <div className="space-y-6 pt-4">
                  <div className="text-center py-8">
                    <Bot size={48} className="mx-auto text-cyber-blue mb-4 opacity-50" />
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] max-w-[200px] mx-auto leading-relaxed">
                      Initialize neural sequence to begin exploration.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: 'Find me AI tools', icon: Search },
                      { label: 'Enter the Hidden Vault', icon: Sparkles },
                      { label: 'How does this work?', icon: HelpCircle },
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => { setInput(suggestion.label); handleSend(); }}
                        className="flex items-center gap-3 p-3 text-left bg-white/5 border border-white/5 rounded hover:bg-cyber-blue/10 hover:border-cyber-blue/30 transition-all group"
                      >
                        <suggestion.icon size={14} className="text-cyber-blue" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/60 group-hover:text-white">{suggestion.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg: {id: string, role: string, content: string, timestamp: Date, link?: {label: string, url: string}}) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    'flex flex-col gap-2',
                    msg.role === 'assistant' ? 'items-start' : 'items-end'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] p-4 rounded-xl text-sm leading-relaxed',
                      msg.role === 'assistant'
                        ? 'bg-cyber-blue/10 border border-cyber-blue/20 text-white'
                        : 'bg-white/5 border border-white/10 text-white/80'
                    )}
                  >
                    {msg.content}

                    {msg.link && (
                      <Link href={msg.link.url} className="mt-4 flex items-center justify-between p-3 bg-cyber-blue/20 rounded border border-cyber-blue/30 group hover:bg-cyber-blue/30 transition-all">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{msg.link.label}</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                  <span className="text-[8px] font-mono text-white/20 uppercase">
                    {msg.role} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <div className="bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue p-3 rounded-lg text-[10px] uppercase tracking-widest animate-pulse inline-block font-bold">
                  Analyzing neural patterns...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="flex gap-2 bg-cyber-black rounded border border-white/10 p-1 focus-within:border-cyber-blue/50 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Initialize command..."
                  className="flex-1 bg-transparent border-none px-4 py-3 text-sm focus:outline-none text-white placeholder:text-white/20"
                />
                <button
                  onClick={handleSend}
                  className="p-3 bg-cyber-blue text-black rounded hover:bg-white transition-all shadow-[0_0_20px_#00f2ff]"
                >
                  <Send size={18} />
                </button>
              </div>
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
