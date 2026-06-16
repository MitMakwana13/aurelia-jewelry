"use client";

import { create } from "zustand";

type UIState = {
  searchOpen: boolean;
  mobileNavOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
};

export const useUI = create<UIState>((set) => ({
  searchOpen: false,
  mobileNavOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
}));
