import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { fetchGameCatalog } from '../services/gameCatalog';
import { useGameStore } from '../store/useGameStore';
import { useGroupStore } from '../store/useGroupStore';
import { listSessions } from '../services/sessionService';
import { useUserStore } from '../store/useUserStore';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 60_000 } },
});

export function AppProviders({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}><AuthBootstrap /><CatalogBootstrap />{children}</QueryClientProvider>;
}

function AuthBootstrap() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const syncProfile = async (authUser: SupabaseUser | null) => {
      if (!authUser) return;
      const { data } = await supabase.from('profiles').select('username, avatar_url').eq('id', authUser.id).maybeSingle();
      const fallbackName = authUser.user_metadata?.username || authUser.email?.split('@')[0] || 'Jogador';
      setUser({
        id: authUser.id,
        username: (data?.username || fallbackName).toUpperCase(),
        avatarUrl: data?.avatar_url || undefined,
      });
    };

    supabase.auth.getUser().then(({ data }) => syncProfile(data.user)).catch(() => undefined);
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      syncProfile(session?.user ?? null).catch(() => undefined);
    });
    return () => listener.subscription.unsubscribe();
  }, [setUser]);

  return null;
}

function CatalogBootstrap() {
  const replaceGames = useGameStore((state) => state.replaceGames);
  const mergeRemoteSessions = useGroupStore((state) => state.mergeRemoteSessions);
  useEffect(() => {
    fetchGameCatalog().then(({ games }) => replaceGames(games)).catch(() => undefined);
    listSessions().then((sessions) => { if (sessions) mergeRemoteSessions(sessions); }).catch(() => undefined);
  }, [replaceGames, mergeRemoteSessions]);
  return null;
}
