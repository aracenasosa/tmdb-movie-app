export const Endpoints = {
  movie: {
    popular: '/movie/popular',
    nowPlaying: '/movie/now_playing',
    upcoming: '/movie/upcoming',
    topRated: '/movie/top_rated',
    details: (id: number) => `/movie/${id}`,
    videos: (id: number) => `/movie/${id}/videos`,
  },
  search: {
    movies: '/search/movie',
  },
};
