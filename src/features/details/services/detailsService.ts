import { httpClient } from '../../../core/api/httpClient';
import { Endpoints } from '../../../core/api/endpoints';
import { cacheManager } from '../../../core/cache/cacheManager';
import { MovieDetails, MovieVideo, VideoResponse } from '../../../core/types/movie';

export const detailsService = {
  async getMovieDetails(id: number): Promise<MovieDetails> {
    const cacheKey = `movie_details_${id}`;
    const cached = await cacheManager.get<MovieDetails>(cacheKey);
    if (cached) return cached;

    const response: MovieDetails = await httpClient.get(Endpoints.movie.details(id));
    await cacheManager.set(cacheKey, response);
    return response;
  },

  async getMovieVideos(id: number): Promise<MovieVideo[]> {
    const cacheKey = `movie_videos_${id}`;
    const cached = await cacheManager.get<MovieVideo[]>(cacheKey);
    if (cached) return cached;

    const response: VideoResponse = await httpClient.get(Endpoints.movie.videos(id));
    await cacheManager.set(cacheKey, response.results);
    return response.results;
  },

};
