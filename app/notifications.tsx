import { useState } from 'react';
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

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Uma vaga abriu',
    copy: 'Zombicide · Noite zero está com 1 vaga em Pinheiros.',
    time: 'agora',
    route: '/party/session-1',
  },
  {
    id: '2',
    title: 'Rafael aceitou seu pedido',
    copy: 'Sua entrada em Scythe · Conquista foi confirmada.',
    time: '12 min',
    route: '/(tabs)',
  },
  {
    id: '3',
    title: 'Nova mesa perto de você',
    copy: 'Cascadia começa amanhã, a 1,4 km de distância.',
    time: '1 h',
    route: '/party/session-3',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [items, setItems] = useState(MOCK_NOTIFICATIONS);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="white" />
          </Pressable>
          <View>
            <Text style={styles.eyebrow}>CENTRAL DA REDE</Text>
            <Text style={styles.title}>Notificações</Text>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.actions}>
          <Pressable onPress={() => setItems([...items])}>
            <Text style={styles.actionRead}>✓ LER TODAS</Text>
          </Pressable>
          <Pressable onPress={() => setItems([])}>
            <Text style={styles.actionClear}>✕ LIMPAR TODAS</Text>
          </Pressable>
        </View>

        {items.length > 0 ? (
          items.map((item) => (
            <Pressable
              key={item.id}
              style={styles.noticeCard}
              onPress={() => router.push(item.route as any)}
            >
              <View style={styles.noticeDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <Text style={styles.noticeCopy}>{item.copy}</Text>
                <Text style={styles.noticeTime}>{item.time}</Text>
              </View>
              <Ionicons name="arrow-forward" color={Colors.textMuted} size={17} />
            </Pressable>
          ))
        ) : (
          <View style={styles.empty}>
            <Ionicons name="notifications-outline" size={32} color={Colors.cyan} />
            <Text style={styles.emptyTitle}>Sem notificações</Text>
            <Text style={styles.emptyCopy}>A rede está em silêncio por enquanto.</Text>
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
  scroll: { paddingBottom: 48 },
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
  actions: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.borderWhite,
  },
  actionRead: { color: Colors.cyan, fontSize: 10, fontWeight: '700' },
  actionClear: { color: Colors.textSecondary, fontSize: 10, fontWeight: '700' },
  noticeCard: {
    padding: 15,
    marginHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.borderWhite,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  noticeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.magenta,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  noticeTitle: { color: Colors.textPrimary, fontWeight: '700', fontSize: 15 },
  noticeCopy: { color: Colors.textSecondary, fontSize: 12, lineHeight: 16, marginTop: 4 },
  noticeTime: { color: Colors.cyan, fontSize: 9, marginTop: 5 },
  empty: { alignItems: 'center', paddingTop: 110 },
  emptyTitle: { color: Colors.textPrimary, fontWeight: '700', fontSize: 19, marginTop: 14 },
  emptyCopy: { color: Colors.textMuted, fontSize: 13, marginTop: 5 },
});
