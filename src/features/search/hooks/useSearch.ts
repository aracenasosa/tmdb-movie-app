import { useState, useEffect } from 'react';
import { Movie } from '../../../core/types/movie';
import { searchService } from '../services/searchService';
import { useDebounce } from '../../../shared/hooks/useDebounce';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const data = await searchService.searchMovies(debouncedQuery);
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    loading,
  };
};
