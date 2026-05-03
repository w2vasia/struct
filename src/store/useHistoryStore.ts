import { create } from 'zustand';

interface HistoryState {
  past: { nodes: any[]; edges: any[] }[];
  future: { nodes: any[]; edges: any[] }[];

  pushState: (nodes: any[], edges: any[]) => void;
  undo: () => { nodes: any[]; edges: any[] } | null;
  redo: () => { nodes: any[]; edges: any[] } | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const MAX_HISTORY = 50;

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],

  pushState: (nodes, edges) => {
    set((state) => ({
      past: [
        ...state.past.slice(-MAX_HISTORY + 1),
        { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) },
      ],
      future: [],
    }));
  },

  undo: () => {
    const { past } = get();
    if (past.length === 0) return null;
    const previous = past[past.length - 1];
    set((state) => ({
      past: state.past.slice(0, -1),
      future: [previous, ...state.future],
    }));
    return previous;
  },

  redo: () => {
    const { future } = get();
    if (future.length === 0) return null;
    const next = future[0];
    set((state) => ({
      past: [...state.past, next],
      future: state.future.slice(1),
    }));
    return next;
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
}));
