import { create } from 'zustand';
import { Product } from '@/types';

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (product) =>
    set((state) => ({
      items: [...state.items, product],
      total: state.total + product.price,
    })),
  removeItem: (productId) =>
    set((state) => {
      const itemToRemove = state.items.find((item) => item.id === productId);
      return {
        items: state.items.filter((item) => item.id !== productId),
        total: state.total - (itemToRemove?.price || 0),
      };
    }),
  clearCart: () => set({ items: [], total: 0 }),
}));
