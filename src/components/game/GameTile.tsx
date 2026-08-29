import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import type { Game } from '../../types/Game';

interface GameTileProps {
  game: Game;
  onPress: () => void;
}

export function GameTile({ game, onPress }: GameTileProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.tile, { opacity: pressed ? 0.85 : 1 }]}>
      <Image source={{ uri: game.coverUrl }} style={StyleSheet.absoluteFillObject} />
      <LinearGradient
        colors={['transparent', 'rgba(5,6,12,0.98)']}
        style={StyleSheet.absoluteFillObject}
      />
      {game.tag && (
        <Text style={styles.tag}>{game.tag}</Text>
      )}
      <View style={styles.bottom}>
        <Text style={styles.title} numberOfLines={1}>{game.title}</Text>
        <Text style={styles.sub} numberOfLines={1}>
          {game.genre[0]} · {game.minPlayers}–{game.maxPlayers}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 146,
    height: 190,
    overflow: 'hidden',
    backgroundColor: '#121725',
  },
  tag: {
    position: 'absolute',
    left: 9,
    top: 9,
    color: Colors.cyan,
    fontSize: 8,
    letterSpacing: 0.8,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.55)',
    padding: 3,
    backgroundColor: '#071A21',
  },
  bottom: {
    position: 'absolute',
    left: 10,
    right: 8,
    bottom: 11,
  },
  title: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  sub: {
    fontSize: 11,
    color: '#BDC9D8',
    marginTop: 2,
  },
});
