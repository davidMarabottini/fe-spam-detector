import { create } from 'zustand';

interface MenuState {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menuOpen: false,
  setMenuOpen: (open: boolean) => set({ menuOpen: open }),
}));
