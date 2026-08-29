import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import type { Game } from '../../types/Game';

interface GameRowProps {
  game: Game;
  onPress: () => void;
}

export function GameRow({ game, onPress }: GameRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, { opacity: pressed ? 0.85 : 1 }]}
    >
      <Image source={{ uri: game.coverUrl }} style={styles.image} />
      <View style={{ flex: 1 }}>
        {game.tag && <Text style={styles.tag}>{game.tag}</Text>}
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.sub}>
          {game.genre[0]} · {game.minPlayers}–{game.maxPlayers} · ★ {game.rating.toFixed(1)}
        </Text>
      </View>
      <Ionicons name="arrow-forward" size={18} color={Colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 80,
    marginHorizontal: 16,
    marginBottom: 9,
    padding: 9,
    borderWidth: 1,
    borderColor: Colors.borderWhite,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  image: { width: 54, height: 60 },
  tag: { color: Colors.cyan, fontSize: 8, letterSpacing: 1 },
  title: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  sub: { color: '#AAB8C8', fontSize: 11, marginTop: 2 },
});
