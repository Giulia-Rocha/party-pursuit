import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { appStorage } from '../lib/storage';
import type { TableSession } from '../types/Group';
import groupsData from '../data/groups.json';

interface GroupState {
  sessions: TableSession[];
  getById: (id: string) => TableSession | undefined;
  getOpenSessions: () => TableSession[];
  joinSession: (id: string) => boolean;
  leaveSession: (id: string) => void;
  replaceSessions: (sessions: TableSession[]) => void;
  mergeRemoteSessions: (sessions: TableSession[]) => void;
  addSession: (session: TableSession) => void;
}

export const useGroupStore = create<GroupState>()(persist((set, get) => ({
  sessions: groupsData as TableSession[],

  getById: (id) => get().sessions.find((s) => s.id === id),

  getOpenSessions: () => get().sessions.filter((s) => s.isOpen),
  joinSession: (id) => {
    const session = get().sessions.find((s) => s.id === id);
    if (!session || !session.isOpen || session.confirmedCount >= session.totalSlots) return false;
    set((state) => ({ sessions: state.sessions.map((s) => s.id === id
      ? { ...s, confirmedCount: s.confirmedCount + 1, isOpen: s.confirmedCount + 1 < s.totalSlots }
      : s) }));
    return true;
  },
  leaveSession: (id) => set((state) => ({ sessions: state.sessions.map((s) => s.id === id
    ? { ...s, confirmedCount: Math.max(0, s.confirmedCount - 1), isOpen: true }
    : s) })),
  replaceSessions: (sessions) => set({ sessions }),
  mergeRemoteSessions: (remoteSessions) => set((state) => {
    const localById = new Map<string, TableSession>();
    (groupsData as TableSession[]).forEach((session) => localById.set(session.id, session));
    state.sessions.filter((session) => !isUuid(session.id)).forEach((session) => localById.set(session.id, session));
    remoteSessions.forEach((session) => localById.delete(session.id));
    return { sessions: [...remoteSessions, ...localById.values()] };
  }),
  addSession: (session) => set((state) => ({ sessions: [session, ...state.sessions] })),
}), {
  name: 'party-pursuit-sessions',
  storage: createJSONStorage(() => appStorage),
}));

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
