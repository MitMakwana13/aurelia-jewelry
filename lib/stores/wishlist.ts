import { create } from "zustand";

interface WishlistState {
  items: Set<string>;
  loading: boolean;
  setItems: (items: string[]) => void;
  toggleItem: (productId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  items: new Set(),
  loading: true,
  setItems: (items) => set({ items: new Set(items), loading: false }),
  toggleItem: (productId) =>
    set((state) => {
      const newItems = new Set(state.items);
      if (newItems.has(productId)) {
        newItems.delete(productId);
      } else {
        newItems.add(productId);
      }
      return { items: newItems };
    }),
  setLoading: (loading) => set({ loading }),
}));
