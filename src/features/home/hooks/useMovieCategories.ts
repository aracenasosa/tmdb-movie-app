import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../../../core/types/movie';
import { homeService } from '../services/homeService';

export const useMovieCategories = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [pop, np, up, tr] = await Promise.all([
        homeService.getPopularMovies(),
        homeService.getNowPlayingMovies(),
        homeService.getUpcomingMovies(),
        homeService.getTopRatedMovies(),
      ]);

      setPopular(pop);
      setNowPlaying(np);
      setUpcoming(up);
      setTopRated(tr);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch movie categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    popular,
    nowPlaying,
    upcoming,
    topRated,
    loading,
    error,
    refetch: fetchCategories,
  };
};
