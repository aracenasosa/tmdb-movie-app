import { httpClient } from '../../../core/api/httpClient';
import { Endpoints } from '../../../core/api/endpoints';
import { Movie, PaginatedResponse } from '../../../core/types/movie';

export const searchService = {
  async searchMovies(query: string): Promise<Movie[]> {
    if (!query.trim()) return [];
    
    const response: PaginatedResponse<Movie> = await httpClient.get(Endpoints.search.movies, {
      params: { query },
    });
    
    return response.results;
  },
};
