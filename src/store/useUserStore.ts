import { create } from 'zustand';
import type { User } from '../types/User';

interface UserState {
  user: User;
  setUser: (user: Partial<User>) => void;
  toggleFavorite: (gameId: string) => void;
  joinSession: (sessionId: string) => void;
  leaveSession: (sessionId: string) => void;
}

const INITIAL_USER: User = {
  id: 'user-1',
  username: 'NOVA',
  favoriteGameIds: [],
  joinedSessionIds: [],
};

export const useUserStore = create<UserState>((set, get) => ({
  user: INITIAL_USER,

  setUser: (partial) =>
    set((s) => ({ user: { ...s.user, ...partial } })),

  toggleFavorite: (gameId) => {
    const { user } = get();
    const favs = user.favoriteGameIds.includes(gameId)
      ? user.favoriteGameIds.filter((id) => id !== gameId)
      : [...user.favoriteGameIds, gameId];
    set({ user: { ...user, favoriteGameIds: favs } });
  },

  joinSession: (sessionId) => {
    const { user } = get();
    if (user.joinedSessionIds.includes(sessionId)) return;
    set({ user: { ...user, joinedSessionIds: [...user.joinedSessionIds, sessionId] } });
  },

  leaveSession: (sessionId) => {
    const { user } = get();
    set({
      user: {
        ...user,
        joinedSessionIds: user.joinedSessionIds.filter((id) => id !== sessionId),
      },
    });
  },
}));
