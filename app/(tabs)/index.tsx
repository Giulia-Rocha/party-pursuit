import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { Typography } from '../../src/constants/Typography';
import { Spacing } from '../../src/constants/Spacing';
import { GameTile } from '../../src/components/game/GameTile';
import { useGameStore } from '../../src/store/useGameStore';
import { useGroupStore } from '../../src/store/useGroupStore';
import { useUserStore } from '../../src/store/useUserStore';

function AppHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <Pressable onPress={() => router.push('/notifications')} style={styles.iconButton}>
        <Ionicons name="notifications-outline" color="white" size={20} />
        <View style={styles.unreadDot} />
      </Pressable>
    </View>
  );
}

function SectionHeader({
  overline,
  title,
  action,
  onPress,
}: {
  overline: string;
  title: string;
  action: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.eyebrow}>{overline}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Pressable onPress={onPress}>
        <Text style={styles.sectionAction}>{action} →</Text>
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const games = useGameStore((s) => s.games);
  const sessions = useGroupStore((s) => s.sessions);
  const username = useUserStore((s) => s.user.username);
  const featured = games.slice(0, 3);
  const nextSession = sessions[0];

  const today = new Date();
  const dayLabel = today.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppHeader eyebrow={dayLabel} title={`Olá, ${username || 'JOGADOR'}.`} />

        {/* Hero Card */}
        {nextSession && (
          <LinearGradient colors={['#171B30', '#0B1120']} style={styles.hero}>
            <Text style={styles.eyebrow}>SEU PRÓXIMO JOGO</Text>
            <Text style={styles.heroTitle}>
              {nextSession.gameName.toUpperCase()}{'\n'}
              <Text style={{ color: Colors.cyan }}>{nextSession.title.split('·')[1]?.trim().toUpperCase() ?? ''}</Text>
            </Text>
            <Text style={styles.heroMeta}>
              ◉  {nextSession.confirmedCount} jogadores    ◷  ~2h
            </Text>
            <Pressable onPress={() => router.push(`/details/${nextSession.gameId}`)}>
              <Text style={styles.heroLink}>VER DETALHES  →</Text>
            </Pressable>
          </LinearGradient>
        )}

        {/* Jogos em Destaque */}
        <SectionHeader
          overline="EM ALTA AGORA"
          title="Jogos na rede"
          action="VER TODOS"
          onPress={() => router.push('/catalog')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontal}
        >
          {featured.map((game) => (
            <GameTile
              key={game.id}
              game={game}
              onPress={() => router.push(`/details/${game.id}`)}
            />
          ))}
        </ScrollView>

        {/* Próximas Sessões */}
        <SectionHeader
          overline="PRÓXIMAS SESSÕES"
          title="Acontecendo perto"
          action="MAPA"
          onPress={() => router.push('/(tabs)/map')}
        />
        {sessions.slice(0, 2).map((session) => {
          const date = new Date(session.scheduledAt);
          const day = date.getDate().toString();
          const month = date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase();
          return (
            <Pressable
              key={session.id}
              style={styles.sessionCard}
              onPress={() => router.push(`/party/${session.id}`)}
            >
              <Text style={styles.dateBlock}>
                {day}{'\n'}
                <Text style={styles.dateMonth}>{month}</Text>
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionSub}>⌖ {session.location}</Text>
              </View>
              <Text style={styles.seats}>
                {session.totalSlots - session.confirmedCount} VAGAS
              </Text>
            </Pressable>
          );
        })}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eyebrow: {
    fontSize: Typography.size.eyebrow,
    letterSpacing: Typography.spacing.eyebrow,
    color: Colors.cyan,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: Colors.magenta,
  },
  hero: {
    marginHorizontal: Spacing.md,
    padding: 21,
    height: 207,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.5)',
  },
  heroTitle: {
    fontSize: 25,
    lineHeight: 26,
    color: Colors.textPrimary,
    fontWeight: '800',
    marginTop: 9,
  },
  heroMeta: { color: '#D9E5F1', fontSize: 12, marginTop: 12 },
  heroLink: {
    color: Colors.cyan,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 26,
  },
  sectionHeader: {
    marginHorizontal: Spacing.md,
    marginTop: 27,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 3,
  },
  sectionAction: {
    color: Colors.cyan,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  horizontal: { paddingLeft: Spacing.md, gap: 10, paddingRight: Spacing.md },
  sessionCard: {
    marginHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  dateBlock: {
    color: Colors.cyan,
    fontWeight: '800',
    fontSize: 23,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,240,255,0.45)',
    paddingRight: 10,
  },
  dateMonth: { fontSize: 9, color: Colors.textSecondary },
  sessionTitle: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  sessionSub: { color: Colors.textSecondary, fontSize: 11, marginTop: 3 },
  seats: { fontSize: 9, color: Colors.seats, fontWeight: '800' },
});
