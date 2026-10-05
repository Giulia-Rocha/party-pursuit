import { create } from 'zustand';
import type { Game, GameGenre } from '../types/Game';
import gamesData from '../data/games.json';

interface Filters {
  genre?: GameGenre;
  search?: string;
  maxMinutes?: number;
}

interface GameState {
  games: Game[];
  filters: Filters;
  setFilter: (f: Partial<Filters>) => void;
  clearFilters: () => void;
  getFiltered: () => Game[];
  getById: (id: string) => Game | undefined;
  replaceGames: (games: Game[]) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  games: gamesData as Game[],
  filters: {},

  setFilter: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
  clearFilters: () => set({ filters: {} }),

  getFiltered: () => {
    const { games, filters } = get();
    return games.filter((g) => {
      if (filters.genre && !g.genre.includes(filters.genre)) return false;
      if (filters.search && !g.title.toLowerCase().includes(filters.search.toLowerCase()))
        return false;
      if (filters.maxMinutes && g.minMinutes > filters.maxMinutes) return false;
      return true;
    });
  },

  getById: (id) => get().games.find((g) => g.id === id),
  replaceGames: (games) => set({ games }),
}));
