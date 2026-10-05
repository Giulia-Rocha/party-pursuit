import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import type { TableSession } from '../../types/Group';
import { Colors } from '../../constants/Colors';

const SAO_PAULO: Region = { latitude: -23.5505, longitude: -46.6333, latitudeDelta: 0.12, longitudeDelta: 0.12 };

export function SessionMap({ sessions, onSelect }: { sessions: TableSession[]; onSelect: (id: string) => void }) {
  const [region, setRegion] = useState(SAO_PAULO);
  const [message, setMessage] = useState('Solicitando localização…');

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(async ({ status }) => {
      if (status !== 'granted') return setMessage('Localização negada; exibindo São Paulo.');
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setRegion((value) => ({ ...value, latitude: current.coords.latitude, longitude: current.coords.longitude }));
      setMessage('Mesas em um raio de 10 km');
    }).catch(() => setMessage('Não foi possível obter sua localização.'));
  }, []);

  return <View>
    <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion} showsUserLocation>
      {sessions.map((session) => <Marker
        key={session.id}
        coordinate={{ latitude: session.latitude ?? SAO_PAULO.latitude, longitude: session.longitude ?? SAO_PAULO.longitude }}
        title={session.title}
        description={session.location}
        onCalloutPress={() => onSelect(session.id)}
      />)}
    </MapView>
    <Text style={styles.note}>{message}</Text>
  </View>;
}

const styles = StyleSheet.create({ map: { height: 288 }, note: { color: Colors.textMuted, fontSize: 10, padding: 8, textAlign: 'center' } });
