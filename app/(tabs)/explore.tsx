import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { Typography } from '../../src/constants/Typography';
import { Spacing } from '../../src/constants/Spacing';
import { GameRow } from '../../src/components/game/GameRow';
import { useGameStore } from '../../src/store/useGameStore';
import type { GameGenre } from '../../src/types/Game';

const GENRES: GameGenre[] = ['Cooperativo', 'Estratégia', 'Deckbuilding', 'Aventura', 'Temático'];

export default function ExploreScreen() {
  const router = useRouter();
  const { games, filters, setFilter, clearFilters } = useGameStore();
  const [search, setSearch] = useState('');

  const filtered = games.filter((g) => {
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = !filters.genre || g.genre.includes(filters.genre);
    return matchSearch && matchGenre;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CATÁLOGO DE JOGOS</Text>
          <Text style={styles.title}>Explorar</Text>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={Colors.cyan} />
          <TextInput
            placeholder="Buscar jogo, tema ou mecânica"
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Filtros de Gênero */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <Pressable
            style={[styles.chip, !filters.genre && styles.chipActive]}
            onPress={clearFilters}
          >
            <Text style={[styles.chipText, !filters.genre && { color: Colors.cyan }]}>Todos</Text>
          </Pressable>
          {GENRES.map((genre) => (
            <Pressable
              key={genre}
              style={[styles.chip, filters.genre === genre && styles.chipActive]}
              onPress={() => setFilter({ genre: filters.genre === genre ? undefined : genre })}
            >
              <Text
                style={[styles.chipText, filters.genre === genre && { color: Colors.cyan }]}
              >
                {genre}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Resultado */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.eyebrow}>{filtered.length} JOGOS ENCONTRADOS</Text>
            <Text style={styles.sectionTitle}>Descobertas</Text>
          </View>
          <Pressable onPress={() => router.push('/catalog')}>
            <Text style={styles.sectionAction}>VER TODOS →</Text>
          </Pressable>
        </View>

        {filtered.map((game) => (
          <GameRow
            key={game.id}
            game={game}
            onPress={() => router.push(`/details/${game.id}`)}
          />
        ))}
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
  searchBar: {
    height: 50,
    marginHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    gap: 9,
    backgroundColor: Colors.surface,
  },
  searchInput: { flex: 1, color: Colors.textPrimary, fontSize: 14 },
  chips: {
    paddingHorizontal: Spacing.md,
    paddingTop: 15,
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  chipActive: {
    borderColor: Colors.cyan,
    backgroundColor: 'rgba(0,240,255,0.08)',
  },
  chipText: { color: Colors.textSecondary, fontSize: 10 },
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
});
