import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/Colors';
import { Typography } from '../../src/constants/Typography';
import { Spacing } from '../../src/constants/Spacing';
import { useGroupStore } from '../../src/store/useGroupStore';
import { SessionMap } from '../../src/components/map/SessionMap';
import { useState } from 'react';

export default function MapScreen() {
  const router = useRouter();
  const sessions = useGroupStore((s) => s.sessions);
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const open = sessions.filter((s) => !onlyAvailable || s.isOpen);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>MATCHMAKING AO VIVO</Text>
          <Text style={styles.title}>Mesas por perto</Text>
        </View>

        <Pressable
          onPress={() => router.push('/session/new' as any)}
          style={({ pressed }) => [styles.createButton, pressed && { opacity: 0.82 }]}
        >
          <View style={styles.createIcon}>
            <Ionicons name="add" size={24} color={Colors.textPrimary} />
          </View>
          <View style={styles.createCopy}>
            <Text style={styles.createTitle}>CRIAR NOVA MESA</Text>
            <Text style={styles.createSubtitle}>Escolha o jogo, local e horário</Text>
          </View>
          <Ionicons name="arrow-forward" size={19} color={Colors.textPrimary} />
        </Pressable>

        <SessionMap sessions={open} onSelect={(id) => router.push(`/party/${id}`)} />

        {/* Lista de mesas */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.eyebrow}>{open.length} MESAS ABERTAS</Text>
            <Text style={styles.sectionTitle}>Entre na partida</Text>
          </View>
          <Pressable onPress={() => setOnlyAvailable((value) => !value)}>
            <Text style={styles.sectionAction}>{onlyAvailable ? 'SÓ COM VAGAS' : 'TODAS'} →</Text>
          </Pressable>
        </View>

        {open.map((session) => (
          <Pressable
            key={session.id}
            style={styles.tableCard}
            onPress={() => router.push(`/party/${session.id}`)}
          >
            <Image source={{ uri: session.gameImage }} style={styles.tableImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.tableTitle}>{session.title}</Text>
              <Text style={styles.tableSub}>⌖ {session.location} · {session.distanceKm} km</Text>
              <Text style={styles.tableSeats}>
                {'● '.repeat(session.confirmedCount)} +{session.totalSlots - session.confirmedCount} vaga(s)
              </Text>
            </View>
            <Ionicons name="arrow-forward" color="white" size={18} />
          </Pressable>
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
    paddingBottom: 4,
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
  createButton: {
    minHeight: 72,
    marginHorizontal: Spacing.md,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 14,
    backgroundColor: Colors.magenta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: Colors.magenta,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  createIcon: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createCopy: { flex: 1 },
  createTitle: { color: Colors.textPrimary, fontSize: 12, fontWeight: '800', letterSpacing: 0.8 },
  createSubtitle: { color: 'rgba(255,255,255,0.78)', fontSize: 10, marginTop: 4 },
  map: {
    height: 288,
    marginTop: 8,
    backgroundColor: Colors.surfaceAlt,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,240,255,0.4)',
    position: 'relative',
  },
  mapRoute: {
    position: 'absolute',
    height: 2,
    width: 280,
    left: 25,
    top: 145,
    backgroundColor: Colors.cyan,
    transform: [{ rotate: '-22deg' }],
  },
  pin: {
    position: 'absolute',
    width: 34,
    height: 34,
    backgroundColor: '#07313B',
    borderWidth: 1,
    borderColor: Colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  pinText: { color: Colors.textPrimary, fontWeight: '700', fontSize: 12 },
  mapLabel: {
    position: 'absolute',
    color: '#5E879B',
    fontSize: 9,
    letterSpacing: 1,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 4,
  },
  mapNote: { color: Colors.textMuted, fontSize: 10, letterSpacing: 0.5 },
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
  tableCard: {
    marginHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    padding: 9,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  tableImage: { width: 53, height: 59 },
  tableTitle: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  tableSub: { color: Colors.textSecondary, fontSize: 11, marginTop: 3 },
  tableSeats: { color: Colors.cyan, fontSize: 10, marginTop: 7 },
});
