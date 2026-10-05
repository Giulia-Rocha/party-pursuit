import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { useGameStore } from '../../src/store/useGameStore';
import { useGroupStore } from '../../src/store/useGroupStore';
import { createSession } from '../../src/services/sessionService';
import { isSupabaseConfigured, supabase } from '../../src/lib/supabase';

export default function NewSessionScreen() {
  const router = useRouter();
  const games = useGameStore((state) => state.games);
  const addSession = useGroupStore((state) => state.addSession);
  const [selectedGameId, setSelectedGameId] = useState(games[0]?.id ?? '');
  const [title, setTitle] = useState('Nova partida');
  const [location, setLocation] = useState('Avenida Paulista, São Paulo');
  const [date, setDate] = useState('2026-11-15T19:00:00-03:00');
  const [totalSlots, setTotalSlots] = useState(4);
  const [loading, setLoading] = useState(false);
  const game = useMemo(() => games.find((item) => item.id === selectedGameId) ?? games[0], [games, selectedGameId]);

  const submit = async () => {
    if (!game) return Alert.alert('Escolha um jogo', 'Selecione o jogo desta mesa.');
    if (title.trim().length < 3 || !location.trim() || Number.isNaN(Date.parse(date)) || new Date(date) <= new Date())
      return Alert.alert('Revise os dados', 'Informe título, local e uma data futura em formato ISO.');
    setLoading(true);
    try {
      const { data: { user } } = isSupabaseConfigured ? await supabase.auth.getUser() : { data: { user: null } };
      const session = await createSession({
        gameId: game.id, gameName: game.title, gameImage: game.coverUrl, title: title.trim(), location: location.trim(),
        latitude: -23.5614, longitude: -46.6559, scheduledAt: date, totalSlots,
      }, user?.id);
      addSession(session);
      router.replace(`/party/${session.id}`);
    } catch (error) {
      Alert.alert('Erro ao criar mesa', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Pressable onPress={() => router.back()} style={styles.back} accessibilityLabel="Voltar">
        <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
      </Pressable>
      <Text style={styles.eyebrow}>ORGANIZAR PARTIDA</Text>
      <Text style={styles.title}>Criar mesa</Text>

      <Text style={styles.label}>ESCOLHA O JOGO</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gameList}>
        {games.map((item) => {
          const selected = item.id === game?.id;
          return <Pressable
            key={item.id}
            onPress={() => setSelectedGameId(item.id)}
            style={[styles.gameCard, selected && styles.gameCardSelected]}
          >
            <Image source={{ uri: item.coverUrl }} style={styles.gameImage} />
            <View style={styles.gameInfo}>
              <Text numberOfLines={1} style={[styles.gameTitle, selected && styles.gameTitleSelected]}>{item.title}</Text>
              <Text style={styles.gameMeta}>{item.minPlayers}–{item.maxPlayers} jogadores</Text>
            </View>
            {selected && <View style={styles.check}><Ionicons name="checkmark" size={14} color={Colors.ink} /></View>}
          </Pressable>;
        })}
      </ScrollView>

      <Text style={styles.label}>TÍTULO DA MESA</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex.: Noite de estratégia" placeholderTextColor={Colors.textMuted} />
      <Text style={styles.label}>LOCAL</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Endereço ou estabelecimento" placeholderTextColor={Colors.textMuted} />
      <Text style={styles.label}>DATA E HORÁRIO</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="2026-11-15T19:00:00-03:00" placeholderTextColor={Colors.textMuted} autoCapitalize="none" />

      <Text style={styles.label}>TOTAL DE JOGADORES</Text>
      <View style={styles.slotRow}>
        {[2, 3, 4, 5, 6].map((slots) => <Pressable
          key={slots}
          onPress={() => setTotalSlots(slots)}
          style={[styles.slot, totalSlots === slots && styles.slotSelected]}
        ><Text style={[styles.slotText, totalSlots === slots && styles.slotTextSelected]}>{slots}</Text></Pressable>)}
      </View>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={submit} disabled={loading}>
        <Ionicons name="add-circle-outline" size={20} color={Colors.textPrimary} />
        <Text style={styles.buttonText}>{loading ? 'CRIANDO…' : 'PUBLICAR MESA'}</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}><Text style={styles.cancel}>CANCELAR</Text></Pressable>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.ink },
  content: { padding: 20, paddingTop: 28, paddingBottom: 48 },
  back: { width: 40, height: 40, borderWidth: 1, borderColor: Colors.borderLight, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  eyebrow: { color: Colors.cyan, fontSize: 10, letterSpacing: 1.4, fontWeight: '700' },
  title: { color: Colors.textPrimary, fontSize: 30, fontWeight: '800', marginTop: 5, marginBottom: 28 },
  label: { color: Colors.textSecondary, fontSize: 9, letterSpacing: 1.2, fontWeight: '700', marginBottom: 8, marginTop: 4 },
  gameList: { gap: 10, paddingBottom: 22 },
  gameCard: { width: 148, borderWidth: 1, borderColor: Colors.borderWhite, backgroundColor: Colors.surface, overflow: 'hidden' },
  gameCardSelected: { borderColor: Colors.cyan, backgroundColor: 'rgba(0,240,255,0.08)' },
  gameImage: { width: '100%', height: 92 },
  gameInfo: { padding: 9 },
  gameTitle: { color: Colors.textPrimary, fontSize: 13, fontWeight: '700' },
  gameTitleSelected: { color: Colors.cyan },
  gameMeta: { color: Colors.textMuted, fontSize: 9, marginTop: 3 },
  check: { position: 'absolute', right: 7, top: 7, width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.cyan, alignItems: 'center', justifyContent: 'center' },
  input: { height: 52, borderWidth: 1, borderColor: Colors.borderCyan, backgroundColor: Colors.surface, color: Colors.textPrimary, paddingHorizontal: 14, marginBottom: 16 },
  slotRow: { flexDirection: 'row', gap: 9, marginBottom: 26 },
  slot: { width: 44, height: 42, borderWidth: 1, borderColor: Colors.borderWhite, alignItems: 'center', justifyContent: 'center' },
  slotSelected: { borderColor: Colors.cyan, backgroundColor: 'rgba(0,240,255,0.12)' },
  slotText: { color: Colors.textSecondary, fontWeight: '700' },
  slotTextSelected: { color: Colors.cyan },
  button: { height: 56, backgroundColor: Colors.magenta, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, shadowColor: Colors.magenta, shadowOpacity: 0.45, shadowRadius: 12, elevation: 6 },
  buttonPressed: { opacity: 0.82 },
  buttonText: { color: Colors.textPrimary, fontWeight: '800', letterSpacing: 1 },
  cancel: { color: Colors.textMuted, textAlign: 'center', marginTop: 20, fontSize: 10, letterSpacing: 1 },
});
