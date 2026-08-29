import { useState } from 'react';
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
import { useGroupStore } from '../../src/store/useGroupStore';
import { useUserStore } from '../../src/store/useUserStore';

export default function PartyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const sessions = useGroupStore((s) => s.sessions);
  const { user, joinSession } = useUserStore();

  const session = sessions.find((s) => s.id === id);
  const hasJoined = user.joinedSessionIds.includes(id ?? '');

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Mesa não encontrada</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>← Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const scheduledDate = new Date(session.scheduledAt);
  const dateStr = scheduledDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
  const timeStr = scheduledDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Capa */}
        <View style={styles.cover}>
          <Image source={{ uri: session.gameImage }} style={StyleSheet.absoluteFillObject} />
          <LinearGradient
            colors={['transparent', Colors.ink]}
            style={StyleSheet.absoluteFillObject}
          />
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="white" />
          </Pressable>
        </View>

        {/* Detalhes da mesa */}
        <View style={styles.content}>
          <Text style={styles.eyebrow}>MESA ABERTA · {session.distanceKm} KM</Text>
          <Text style={styles.title}>
            {session.gameName.toUpperCase()}{'\n'}
            <Text style={{ color: Colors.cyan }}>
              {session.title.split('·')[1]?.trim().toUpperCase() ?? ''}
            </Text>
          </Text>
          <Text style={styles.organizer}>
            Organizado por {session.organizerName} · {dateStr}, {timeStr}
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoItem}>⌖  {session.location}</Text>
            <Text style={styles.infoItem}>
              ◉  {session.confirmedCount}/{session.totalSlots} jogadores confirmados
            </Text>
            <Text style={styles.infoItem}>◷  Duração estimada: ~2h</Text>
          </View>

          {hasJoined ? (
            <View style={styles.joinedBox}>
              <Ionicons name="checkmark" size={22} color={Colors.cyan} />
              <View>
                <Text style={styles.joinedTitle}>PEDIDO ENVIADO</Text>
                <Text style={styles.joinedCopy}>
                  {session.organizerName} vai receber sua solicitação agora.
                </Text>
              </View>
            </View>
          ) : (
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, { opacity: pressed ? 0.82 : 1 }]}
              onPress={() => joinSession(session.id)}
            >
              <Text style={styles.primaryBtnText}>ENTRAR NA PARTIDA</Text>
              <Ionicons name="arrow-forward" size={18} color="white" />
            </Pressable>
          )}

          {hasJoined && (
            <Pressable onPress={() => router.push('/(tabs)')}>
              <Text style={styles.link}>VOLTAR PARA O INÍCIO</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.ink },
  cover: { height: 258, position: 'relative' },
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
  content: { padding: 22, paddingBottom: 96 },
  eyebrow: {
    fontSize: Typography.size.eyebrow,
    letterSpacing: Typography.spacing.eyebrow,
    color: Colors.cyan,
    fontWeight: '700',
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 31,
    lineHeight: 31,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 8,
  },
  organizer: { color: Colors.textSecondary, fontSize: 14, lineHeight: 20 },
  infoBox: {
    gap: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderWhite,
    paddingVertical: 16,
    marginVertical: 17,
  },
  infoItem: { color: Colors.textSecondary, fontSize: 13 },
  joinedBox: {
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.6)',
    backgroundColor: 'rgba(0,240,255,0.08)',
    padding: 14,
    flexDirection: 'row',
    gap: 11,
    alignItems: 'center',
  },
  joinedTitle: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  joinedCopy: { color: '#BBD3D6', fontSize: 12, marginTop: 3 },
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
  link: {
    color: Colors.textMuted,
    fontSize: 10,
    letterSpacing: 1.2,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
  },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundText: { color: Colors.textPrimary, fontSize: 18 },
  backLink: { color: Colors.cyan, fontSize: 14 },
});
