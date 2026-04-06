import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_PREFIX = '@tmdb_cache_';
const DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

export const cacheManager = {
  async get<T>(key: string, maxAge: number = DEFAULT_TTL): Promise<T | null> {
    try {
      const fullKey = `${CACHE_PREFIX}${key}`;
      const itemString = await AsyncStorage.getItem(fullKey);

      if (!itemString) return null;

      const item: CacheEntry<T> = JSON.parse(itemString);
      const isExpired = Date.now() - item.timestamp > maxAge;

      if (isExpired) {
        await AsyncStorage.removeItem(fullKey);
        return null;
      }

      return item.data;
    } catch (e) {
      console.error('Cache read error', e);
      return null;
    }
  },

  async set<T>(key: string, data: T): Promise<void> {
    try {
      const fullKey = `${CACHE_PREFIX}${key}`;
      const item: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(fullKey, JSON.stringify(item));
    } catch (e) {
      console.error('Cache write error', e);
    }
  },

  async invalidate(key: string): Promise<void> {
    try {
      const fullKey = `${CACHE_PREFIX}${key}`;
      await AsyncStorage.removeItem(fullKey);
    } catch (e) {
      console.error('Cache invalidate error', e);
    }
  },

  async clearAll(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (e) {
      console.error('Cache clear error', e);
    }
  },
};
