import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { Typography } from '../../src/constants/Typography';
import { Spacing } from '../../src/constants/Spacing';
import { useGameStore } from '../../src/store/useGameStore';
import { useUserStore } from '../../src/store/useUserStore';

function StatBadge({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={19} color={Colors.cyan} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const getById = useGameStore((s) => s.getById);
  const { user, toggleFavorite } = useUserStore();

  const game = getById(id ?? '');
  const isFav = user.favoriteGameIds.includes(id ?? '');

  if (!game) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Jogo não encontrado</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>← Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.cover}>
          <Image source={{ uri: game.coverUrl }} style={StyleSheet.absoluteFillObject} />
          <LinearGradient
            colors={['transparent', Colors.ink]}
            style={StyleSheet.absoluteFillObject}
          />
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="white" />
          </Pressable>
          <Pressable onPress={() => toggleFavorite(game.id)} style={styles.favBtn}>
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={22}
              color={isFav ? Colors.magenta : 'white'}
            />
          </Pressable>
          <View style={styles.coverTitle}>
            <Text style={styles.eyebrow}>
              {game.genre[0].toUpperCase()} · {game.releaseYear}
            </Text>
            <Text style={styles.coverGame}>{game.title.toUpperCase()}</Text>
            {game.subtitle && <Text style={styles.coverSub}>{game.subtitle}</Text>}
          </View>
        </View>

        {/* Detalhes */}
        <View style={styles.detail}>
          {/* Stats */}
          <View style={styles.statsRow}>
            <StatBadge
              icon="people-outline"
              value={`${game.minPlayers}–${game.maxPlayers}`}
              label="JOGADORES"
            />
            <StatBadge
              icon="time-outline"
              value={`${game.minMinutes}–${game.maxMinutes}`}
              label="MINUTOS"
            />
            <StatBadge icon="shield-outline" value={`${game.minAge}+`} label="IDADE" />
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={Colors.accent} />
            <Text style={styles.ratingText}>{game.rating.toFixed(1)}</Text>
            <Text style={styles.ratingLabel}>/ 5.0</Text>
          </View>

          {/* Descrição */}
          <Text style={styles.description}>{game.description}</Text>

          {/* Mecânicas */}
          <Text style={styles.eyebrow}>MECÂNICAS</Text>
          <View style={styles.chips}>
            {game.mechanics.map((m) => (
              <View key={m} style={styles.chip}>
                <Text style={styles.chipText}>{m}</Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, { opacity: pressed ? 0.82 : 1 }]}
            onPress={() => router.push('/(tabs)/map')}
          >
            <Text style={styles.primaryBtnText}>PROCURAR GRUPO</Text>
            <Ionicons name="people-outline" size={18} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.ink },
  cover: { height: 322, position: 'relative' },
  back: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5,9,18,0.6)',
  },
  favBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5,9,18,0.6)',
  },
  coverTitle: { position: 'absolute', bottom: 24, left: 21 },
  eyebrow: {
    fontSize: Typography.size.eyebrow,
    letterSpacing: Typography.spacing.eyebrow,
    color: Colors.cyan,
    fontWeight: '700',
  },
  coverGame: {
    fontSize: 35,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginTop: 7,
  },
  coverSub: { color: '#C8D2DF', fontSize: 14, marginTop: 2 },
  detail: { padding: Spacing.md, paddingBottom: 96 },
  statsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    marginBottom: 16,
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  ratingText: { color: Colors.accent, fontSize: 16, fontWeight: '700' },
  ratingLabel: { color: Colors.textMuted, fontSize: 12 },
  description: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 18,
  },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 8, marginBottom: 24 },
  chip: {
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  chipText: { color: Colors.textSecondary, fontSize: 10 },
  primaryBtn: {
    height: 53,
    backgroundColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    shadowColor: Colors.magenta,
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryBtnText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundText: { color: Colors.textPrimary, fontSize: 18 },
  backLink: { color: Colors.cyan, fontSize: 14 },
});
