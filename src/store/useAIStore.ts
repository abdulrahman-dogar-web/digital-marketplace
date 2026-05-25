import { create } from 'zustand';
import { Message } from '@/types';

interface AIState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  toggleAI: () => void;
  addMessage: (message: Message) => void;
  setTyping: (isTyping: boolean) => void;
}

export const useAIStore = create<AIState>((set) => ({
  isOpen: false,
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to CyberNest. System online. How can I assist your digital evolution today?',
      timestamp: new Date(),
    },
  ],
  isTyping: false,
  toggleAI: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (isTyping) => set({ isTyping }),
}));
