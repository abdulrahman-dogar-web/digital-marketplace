import { create } from 'zustand';
import { User } from '@/types';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateXP: (amount: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateXP: (amount) =>
    set((state) => {
      if (!state.user) return state;
      const newXP = state.user.xp + amount;
      // Simple rank logic
      let newRank = state.user.rank;
      if (newXP > 1000) newRank = 'Neural Elite';
      else if (newXP > 500) newRank = 'Cyber Agent';
      else if (newXP > 100) newRank = 'Operator';

      return {
        user: { ...state.user, xp: newXP, rank: newRank },
      };
    }),
}));
