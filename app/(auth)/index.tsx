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
import { Colors } from '../../src/constants/Colors';
import { Typography } from '../../src/constants/Typography';
import { Spacing } from '../../src/constants/Spacing';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

function Brand() {
  return (
    <View style={styles.brand}>
      <View style={styles.brandMark}>
        <View style={styles.brandDot} />
        <View style={styles.brandDot} />
        <View style={styles.brandDot} />
      </View>
      <Text style={styles.brandText}>
        GAME<Text style={{ color: Colors.cyan }}>FINDER</Text>
      </Text>
    </View>
  );
}

function TerminalInput({
  placeholder,
  secure = false,
  value,
  onChangeText,
}: {
  placeholder: string;
  secure?: boolean;
  value: string;
  onChangeText: (v: string) => void;
}) {
  return (
    <View style={styles.terminal}>
      <Text style={styles.prompt}>&gt;_</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.textPlaceholder}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        autoCapitalize="none"
      />
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      {/* Glow superior — identidade visual Figma */}
      <View style={styles.topGlow} />

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Brand />

        <Text style={styles.eyebrow}>// ACESSO À REDE LOCAL</Text>
        <Text style={styles.title}>
          ENCONTRE SUA{'\n'}
          <Text style={{ color: Colors.cyan }}>PRÓXIMA MESA.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Conecte-se à comunidade e descubra onde a partida começa.
        </Text>

        <TerminalInput
          placeholder="SEU E-MAIL"
          value={email}
          onChangeText={setEmail}
        />
        <TerminalInput
          placeholder="SUA SENHA"
          secure
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          onPress={() => router.replace('/(tabs)')}
          style={({ pressed }) => [styles.primaryBtn, { opacity: pressed ? 0.82 : 1 }]}
        >
          <Text style={styles.primaryBtnText}>ENTRAR NO JOGO</Text>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </Pressable>

        <Pressable onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.link}>CRIAR NOVA IDENTIDADE</Text>
        </Pressable>
      </ScrollView>

      <Text style={styles.system}>
        <Text style={{ color: Colors.cyan }}>● </Text>SISTEMA ONLINE · SP 02
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.ink,
  },
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
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: 72,
    paddingBottom: 80,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: Colors.cyan,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  brandDot: {
    width: 4,
    height: 4,
    backgroundColor: Colors.cyan,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.textPrimary,
  },
  eyebrow: {
    fontSize: Typography.size.eyebrow,
    letterSpacing: Typography.spacing.eyebrow,
    color: Colors.cyan,
    fontWeight: '700',
    marginTop: 54,
  },
  title: {
    fontSize: Typography.size.display,
    lineHeight: 38,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 12,
  },
  subtitle: {
    fontSize: Typography.size.body,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginVertical: 18,
  },
  terminal: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 11,
  },
  prompt: {
    color: Colors.cyan,
    fontWeight: '700',
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 12,
    letterSpacing: 1,
    marginLeft: 9,
  },
  primaryBtn: {
    height: 53,
    backgroundColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
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
  system: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
    fontSize: 9,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
});
