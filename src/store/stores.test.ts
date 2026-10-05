import { useGameStore } from './useGameStore';
import { useGroupStore } from './useGroupStore';
import { useUserStore } from './useUserStore';

describe('stores do protótipo', () => {
  beforeEach(() => {
    useUserStore.setState({ user: { id: 'test', username: 'TESTE', favoriteGameIds: [], joinedSessionIds: [] } });
  });

  test('filtra jogos por busca e gênero', () => {
    useGameStore.getState().setFilter({ search: 'zombi', genre: 'Cooperativo' });
    expect(useGameStore.getState().getFiltered().map((game) => game.id)).toContain('zombicide');
    useGameStore.getState().clearFilters();
  });

  test('alterna favorito sem duplicar', () => {
    useUserStore.getState().toggleFavorite('zombicide');
    useUserStore.getState().toggleFavorite('zombicide');
    expect(useUserStore.getState().user.favoriteGameIds).toEqual([]);
  });

  test('não permite entrar em mesa lotada', () => {
    const full = useGroupStore.getState().sessions.find((session) => !session.isOpen)!;
    expect(useGroupStore.getState().joinSession(full.id)).toBe(false);
  });

  test('mescla mesas remotas sem remover os mocks', () => {
    const mockId = useGroupStore.getState().sessions.find((session) => session.id === 'session-1')?.id;
    useGroupStore.getState().mergeRemoteSessions([{ ...useGroupStore.getState().sessions[0], id: '00000000-0000-4000-8000-000000000001' }]);
    expect(useGroupStore.getState().sessions.some((session) => session.id === mockId)).toBe(true);
    expect(useGroupStore.getState().sessions.some((session) => session.id === '00000000-0000-4000-8000-000000000001')).toBe(true);
  });
});
