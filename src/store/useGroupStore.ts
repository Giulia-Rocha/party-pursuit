import { create } from 'zustand';
import type { TableSession } from '../types/Group';
import groupsData from '../data/groups.json';

interface GroupState {
  sessions: TableSession[];
  getById: (id: string) => TableSession | undefined;
  getOpenSessions: () => TableSession[];
}

export const useGroupStore = create<GroupState>((set, get) => ({
  sessions: groupsData as TableSession[],

  getById: (id) => get().sessions.find((s) => s.id === id),

  getOpenSessions: () => get().sessions.filter((s) => s.isOpen),
}));
