import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { Typography } from '../../src/constants/Typography';
import { Spacing } from '../../src/constants/Spacing';
import { useUserStore } from '../../src/store/useUserStore';
import { useGameStore } from '../../src/store/useGameStore';
import { useRouter } from 'expo-router';
import { isSupabaseConfigured, supabase } from '../../src/lib/supabase';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const games = useGameStore((s) => s.games);
  const favGames = games.filter((g) => user.favoriteGameIds.includes(g.id));

  const stats = [
    { icon: 'game-controller-outline' as const, value: favGames.length.toString(), label: 'FAVORITOS' },
    { icon: 'people-outline' as const, value: user.joinedSessionIds.length.toString(), label: 'PARTIDAS' },
    { icon: 'star-outline' as const, value: '4.8', label: 'AVALIAÇÃO' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>MEU PERFIL</Text>
          <Text style={styles.title}>Perfil</Text>
        </View>

        {/* Avatar + Username */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={Colors.cyan} />
          </View>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.userSub}>Jogador desde 2024</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Ionicons name={stat.icon} size={19} color={Colors.cyan} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Plataformas */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>PLATAFORMAS</Text>
          <View style={styles.chips}>
            {['Tabuleiro', 'RPG', 'Digital'].map((p) => (
              <View key={p} style={styles.chip}>
                <Text style={styles.chipText}>{p}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Jogos Favoritos */}
        {favGames.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>JOGOS FAVORITOS</Text>
            {favGames.map((g) => (
              <Text key={g.id} style={styles.favGame}>
                ★  {g.title}
              </Text>
            ))}
          </View>
        )}

        {/* Placeholder para CP5/CP6 */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>CONFIGURAÇÕES</Text>
          <Pressable style={styles.menuItem} onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.menuLabel}>Notificações</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => Alert.alert('Privacidade', 'Localização é solicitada somente ao abrir o mapa. Seus dados são protegidos por políticas de acesso por usuário.') }>
            <Ionicons name="shield-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.menuLabel}>Privacidade</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => Alert.alert('Ajuda', 'Consulte o manual de uso no repositório ou fale com a equipe Party Pursuit.') }>
            <Ionicons name="help-circle-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.menuLabel}>Ajuda</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
          </Pressable>
          <Pressable style={styles.menuItem} onPress={async () => { if (isSupabaseConfigured) await supabase.auth.signOut(); router.replace('/(auth)'); }}>
            <Ionicons name="log-out-outline" size={18} color={Colors.magenta} />
            <Text style={styles.menuLabel}>Sair</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.ink },
  topGlow: {
    height: 2,
    width: 140,
    backgroundColor: Colors.cyan,
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    shadowColor: Colors.cyan,
    shadowOpacity: 0.8,
    shadowRadius: 12,
    zIndex: 4,
  },
  scroll: { paddingBottom: 96 },
  header: {
    paddingTop: 31,
    paddingHorizontal: Spacing.md,
    paddingBottom: 18,
  },
  eyebrow: {
    fontSize: Typography.size.eyebrow,
    letterSpacing: Typography.spacing.eyebrow,
    color: Colors.cyan,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  avatarSection: { alignItems: 'center', paddingVertical: Spacing.lg },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  username: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 12,
    letterSpacing: 1,
  },
  userSub: { color: Colors.textMuted, fontSize: 12, marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    marginHorizontal: Spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: Colors.borderWhite,
  },
  statValue: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700', marginTop: 3 },
  statLabel: { color: Colors.textMuted, fontSize: 8, marginTop: 3 },
  section: { marginHorizontal: Spacing.md, marginTop: 24 },
  sectionEyebrow: {
    fontSize: Typography.size.eyebrow,
    letterSpacing: Typography.spacing.eyebrow,
    color: Colors.cyan,
    fontWeight: '700',
    marginBottom: 12,
  },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  chipText: { color: Colors.textSecondary, fontSize: 10 },
  favGame: { color: Colors.textPrimary, fontSize: 14, marginBottom: 8, fontWeight: '500' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderWhite,
  },
  menuLabel: { flex: 1, color: Colors.textPrimary, fontSize: 14 },
});
