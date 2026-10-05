import { isSupabaseConfigured, supabase } from '../lib/supabase';

export async function syncFavorite(gameId: string, favorite: boolean) {
  if (!isSupabaseConfigured) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const query = favorite
    ? supabase.from('favorites').upsert({ user_id: user.id, game_id: gameId })
    : supabase.from('favorites').delete().eq('user_id', user.id).eq('game_id', gameId);
  const { error } = await query;
  if (error) throw error;
}
