import type { TableSession } from '../types/Group';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export type SessionInput = Pick<TableSession, 'gameId' | 'gameName' | 'gameImage' | 'title' | 'location' | 'latitude' | 'longitude' | 'scheduledAt' | 'totalSlots'>;

export async function listSessions(): Promise<TableSession[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase.from('sessions').select('*, profiles!sessions_organizer_id_fkey(username), session_members(count)').eq('status', 'open').gt('scheduled_at', new Date().toISOString()).order('scheduled_at');
  if (error) throw error;
  return (data ?? []).map((row: any) => ({ id: row.id, gameId: String(row.game_id), gameName: row.game_name, gameImage: row.game_image,
    title: row.title, organizerName: row.profiles?.username ?? 'Jogador', location: row.location_name,
    latitude: row.latitude, longitude: row.longitude, distanceKm: 0, scheduledAt: row.scheduled_at,
    totalSlots: row.total_slots, confirmedCount: 1 + Number(row.session_members?.[0]?.count ?? 0), isOpen: row.status === 'open' }));
}

export async function createSession(input: SessionInput, organizerId?: string): Promise<TableSession> {
  if (!isSupabaseConfigured || !organizerId) return { ...input, id: `local-${Date.now()}`, organizerName: 'Você', distanceKm: 0, confirmedCount: 1, isOpen: true };
  const { data, error } = await supabase.from('sessions').insert({ game_id: input.gameId, game_name: input.gameName,
    game_image: input.gameImage, organizer_id: organizerId, title: input.title, location_name: input.location,
    latitude: input.latitude, longitude: input.longitude, scheduled_at: input.scheduledAt, total_slots: input.totalSlots }).select().single();
  if (error) throw error;
  return { ...input, id: data.id, organizerName: 'Você', distanceKm: 0, confirmedCount: 1, isOpen: true };
}

export async function cancelSession(id: string) {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('sessions').update({ status: 'cancelled' }).eq('id', id);
  if (error) throw error;
}
