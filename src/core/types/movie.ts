export interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  video: boolean;
  adult: boolean;
  original_language: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CollectionReference {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  belongs_to_collection?: CollectionReference | null;
  runtime: number | null;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  homepage: string | null;
}

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: 'YouTube' | 'Vimeo' | string;
  size: number;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers' | string;
  official: boolean;
  published_at: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  dates?: {
    maximum: string;
    minimum: string;
  };
}

export interface VideoResponse {
  id: number;
  results: MovieVideo[];
}
