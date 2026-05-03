import { create } from 'zustand';

interface UIState {
  showMinimap: boolean;
  snapToGrid: boolean;
  gridSize: number;
  toggleMinimap: () => void;
  toggleSnapToGrid: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  showMinimap: true,
  snapToGrid: true,
  gridSize: 20,
  toggleMinimap: () => set((s) => ({ showMinimap: !s.showMinimap })),
  toggleSnapToGrid: () => set((s) => ({ snapToGrid: !s.snapToGrid })),
}));
