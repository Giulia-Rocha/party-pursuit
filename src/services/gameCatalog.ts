import gamesData from '../data/games.json';
import type { Game } from '../types/Game';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export async function fetchGameCatalog(): Promise<{ games: Game[]; source: 'supabase' | 'fallback' }> {
  if (!isSupabaseConfigured) return { games: gamesData as Game[], source: 'fallback' };
  const { data, error } = await supabase.from('games').select('*').order('rating', { ascending: false });
  if (error || !data?.length) return { games: gamesData as Game[], source: 'fallback' };

  return {
    source: 'supabase',
    games: data.map((item: any): Game => ({
      id: item.slug || String(item.id),
      title: item.title,
      subtitle: item.subtitle || undefined,
      genre: item.genres?.length ? item.genres : ['Estratégia'],
      minPlayers: item.min_players || 1,
      maxPlayers: item.max_players || 4,
      minMinutes: item.min_minutes || 30,
      maxMinutes: item.max_minutes || 120,
      minAge: item.min_age || 10,
      rating: Number(item.rating || 0),
      releaseYear: item.year_published || 0,
      description: item.description || 'Descrição indisponível.',
      mechanics: item.mechanics || [],
      coverUrl: item.image_url || item.thumbnail_url || '',
      tag: item.tag || undefined,
    })),
  };
}
