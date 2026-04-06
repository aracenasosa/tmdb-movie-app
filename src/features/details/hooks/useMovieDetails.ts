import { useState, useEffect, useCallback } from 'react';
import { MovieDetails, MovieVideo } from '../../../core/types/movie';
import { detailsService } from '../services/detailsService';

export const useMovieDetails = (id: number) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<MovieVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [movieData, videosData] = await Promise.all([
        detailsService.getMovieDetails(id),
        detailsService.getMovieVideos(id),
      ]);

      setDetails(movieData);

      const ytTrailer = videosData.find(
        (v: MovieVideo) => v.site === 'YouTube' && v.type === 'Trailer'
      );
      setTrailer(ytTrailer || null);

    } catch (err) {
      console.error('Error fetching details:', err);
      setError('Failed to fetch movie details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    details,
    trailer,
    loading,
    error,
    refetch: fetchDetails,
  };
};
