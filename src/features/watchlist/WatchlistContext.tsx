import React, { createContext, useContext, useEffect, useState } from 'react';
import { Movie } from '../../core/types/movie';
import { watchlistService } from './services/watchlistService';

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => Promise<void>;
  removeFromWatchlist: (movieId: number) => Promise<void>;
  isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    const list = await watchlistService.getWatchlist();
    setWatchlist(list);
  };

  const addToWatchlist = async (movie: Movie) => {
    await watchlistService.addToWatchlist(movie);
    setWatchlist((prev) => [...prev, movie]);
  };

  const removeFromWatchlist = async (movieId: number) => {
    await watchlistService.removeFromWatchlist(movieId);
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlistContext must be used within a WatchlistProvider');
  }
  return context;
};
