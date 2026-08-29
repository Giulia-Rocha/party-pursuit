import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../src/constants/Colors';
import { Typography } from '../src/constants/Typography';
import { Spacing } from '../src/constants/Spacing';
import { GameRow } from '../src/components/game/GameRow';
import { GameTile } from '../src/components/game/GameTile';
import { useGameStore } from '../src/store/useGameStore';
import { useState } from 'react';

export default function CatalogScreen() {
  const router = useRouter();
  const games = useGameStore((s) => s.games);
  const [isGrid, setIsGrid] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header com back */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="white" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>CATÁLOGO COMPLETO</Text>
            <Text style={styles.title}>Todos os jogos</Text>
          </View>
          {/* Toggle grid/list */}
          <View style={styles.toggle}>
            <Pressable
              onPress={() => setIsGrid(true)}
              style={[styles.toggleBtn, isGrid && styles.toggleActive]}
            >
              <Ionicons name="grid-outline" color={isGrid ? Colors.cyan : Colors.textMuted} size={18} />
            </Pressable>
            <Pressable
              onPress={() => setIsGrid(false)}
              style={[styles.toggleBtn, !isGrid && styles.toggleActive]}
            >
              <Ionicons name="list-outline" color={!isGrid ? Colors.cyan : Colors.textMuted} size={18} />
            </Pressable>
          </View>
        </View>

        <Text style={styles.result}>●  {games.length} DE {games.length} JOGOS NA REDE</Text>

        {isGrid ? (
          <View style={styles.grid}>
            {games.map((game) => (
              <GameTile
                key={game.id}
                game={game}
                onPress={() => router.push(`/details/${game.id}`)}
              />
            ))}
          </View>
        ) : (
          <View>
            {games.map((game) => (
              <GameRow
                key={game.id}
                game={game}
                onPress={() => router.push(`/details/${game.id}`)}
              />
            ))}
          </View>
        )}
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
    paddingHorizontal: Spacing.md,
    paddingTop: 31,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  back: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5,9,18,0.6)',
  },
  eyebrow: {
    fontSize: Typography.size.eyebrow,
    letterSpacing: Typography.spacing.eyebrow,
    color: Colors.cyan,
    fontWeight: '700',
  },
  title: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginTop: 2 },
  toggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderWhite,
  },
  toggleBtn: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleActive: { backgroundColor: 'rgba(0,240,255,0.12)' },
  result: {
    color: Colors.textMuted,
    fontSize: 9,
    letterSpacing: 1,
    marginHorizontal: Spacing.md,
    marginBottom: 12,
  },
  grid: {
    marginHorizontal: Spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
