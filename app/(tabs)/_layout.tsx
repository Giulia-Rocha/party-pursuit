import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../src/constants/Colors';

const TAB_CONFIG = [
  { name: 'index', title: 'Início', icon: 'home-outline' as const },
  { name: 'explore', title: 'Explorar', icon: 'search-outline' as const },
  { name: 'map', title: 'Mapa', icon: 'map-outline' as const },
  { name: 'profile', title: 'Perfil', icon: 'person-outline' as const },
] as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <BlurView intensity={45} tint="dark" style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const tab = TAB_CONFIG[index];
            const isFocused = state.index === index;

            return (
              <Pressable
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={styles.tab}
              >
                <Ionicons
                  name={tab.icon}
                  size={21}
                  color={isFocused ? Colors.cyan : Colors.textMuted}
                />
                <Text style={[styles.tabText, isFocused && { color: Colors.cyan }]}>
                  {tab.title}
                </Text>
              </Pressable>
            );
          })}
        </BlurView>
      )}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title }} />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,240,255,0.2)',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#000000',
  },
  tabText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});
