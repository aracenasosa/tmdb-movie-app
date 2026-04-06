import { httpClient } from '../../../core/api/httpClient';
import { Endpoints } from '../../../core/api/endpoints';
import { cacheManager } from '../../../core/cache/cacheManager';
import { Movie, PaginatedResponse } from '../../../core/types/movie';

export const homeService = {
  async getPopularMovies(): Promise<Movie[]> {
    const cacheKey = 'popular_movies';
    const cached = await cacheManager.get<Movie[]>(cacheKey);
    if (cached) return cached;

    const response: PaginatedResponse<Movie> = await httpClient.get(Endpoints.movie.popular);
    const data = response.results;
    await cacheManager.set(cacheKey, data);
    return data;
  },

  async getNowPlayingMovies(): Promise<Movie[]> {
    const cacheKey = 'now_playing_movies';
    const cached = await cacheManager.get<Movie[]>(cacheKey);
    if (cached) return cached;

    const response: PaginatedResponse<Movie> = await httpClient.get(Endpoints.movie.nowPlaying);
    const data = response.results.slice(0, 6);
    await cacheManager.set(cacheKey, data);
    return data;
  },

  async getUpcomingMovies(): Promise<Movie[]> {
    const cacheKey = 'upcoming_movies';
    const cached = await cacheManager.get<Movie[]>(cacheKey);
    if (cached) return cached;

    const response: PaginatedResponse<Movie> = await httpClient.get(Endpoints.movie.upcoming);
    const data = response.results.slice(0, 6);
    await cacheManager.set(cacheKey, data);
    return data;
  },

  async getTopRatedMovies(): Promise<Movie[]> {
    const cacheKey = 'top_rated_movies';
    const cached = await cacheManager.get<Movie[]>(cacheKey);
    if (cached) return cached;

    const response: PaginatedResponse<Movie> = await httpClient.get(Endpoints.movie.topRated);
    const data = response.results.slice(0, 6);
    await cacheManager.set(cacheKey, data);
    return data;
  },
};
