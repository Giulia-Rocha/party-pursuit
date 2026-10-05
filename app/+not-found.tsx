import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{'// ERRO 404'}</Text>
      <Text style={styles.title}>PÁGINA{'\n'}<Text style={{ color: Colors.cyan }}>NÃO ENCONTRADA.</Text></Text>
      <Pressable onPress={() => router.replace('/(tabs)')} style={styles.btn}>
        <Text style={styles.btnText}>VOLTAR PARA O INÍCIO</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  eyebrow: { color: Colors.cyan, fontSize: 10, letterSpacing: 1.4, fontWeight: '700' },
  title: {
    fontSize: 35,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginVertical: 16,
  },
  btn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.cyan,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  btnText: { color: Colors.cyan, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
});
