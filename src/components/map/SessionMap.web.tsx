import { StyleSheet, Text, View } from 'react-native';
import type { TableSession } from '../../types/Group';
import { Colors } from '../../constants/Colors';

export function SessionMap({ sessions }: { sessions: TableSession[]; onSelect: (id: string) => void }) {
  return <View style={styles.map}>
    <Text style={styles.title}>Visualização em lista</Text>
    <Text style={styles.copy}>{sessions.length} mesas próximas. O mapa interativo está disponível no Android.</Text>
  </View>;
}

const styles = StyleSheet.create({ map: { height: 180, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.surfaceAlt, padding: 24 }, title: { color: Colors.cyan, fontWeight: '700' }, copy: { color: Colors.textMuted, textAlign: 'center', marginTop: 8 } });
