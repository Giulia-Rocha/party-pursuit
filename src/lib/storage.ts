import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const serverStorage = {
  getItem: async (_key: string) => null,
  setItem: async (_key: string, _value: string) => undefined,
  removeItem: async (_key: string) => undefined,
};

export const appStorage = Platform.OS === 'web' && typeof window === 'undefined'
  ? serverStorage
  : AsyncStorage;
