import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../../../core/types/movie';

const WATCHLIST_KEY = '@tmdb_watchlist';

export const watchlistService = {
  async getWatchlist(): Promise<Movie[]> {
    try {
      const data = await AsyncStorage.getItem(WATCHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading watchlist', e);
      return [];
    }
  },

  async addToWatchlist(movie: Movie): Promise<void> {
    try {
      const currentList = await this.getWatchlist();
      const exists = currentList.some((m) => m.id === movie.id);
      if (!exists) {
        currentList.push(movie);
        await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(currentList));
      }
    } catch (e) {
      console.error('Error adding to watchlist', e);
    }
  },

  async removeFromWatchlist(movieId: number): Promise<void> {
    try {
      const currentList = await this.getWatchlist();
      const updatedList = currentList.filter((m) => m.id !== movieId);
      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error removing from watchlist', e);
    }
  },
};
