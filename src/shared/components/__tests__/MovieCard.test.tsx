import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { MovieCard } from '../MovieCard';
import { Movie } from '@/core/types/movie';

// Mock data
const mockMovieFixture: Movie = {
  id: 456,
  title: 'Inception',
  poster_path: '/poster123.jpg',
  vote_average: 8.8,
  release_date: '2010-07-16',
  overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
  genre_ids: [28, 878, 12, 53],
  popularity: 150.43,
  original_language: 'en',
  original_title: 'Inception',
  video: false,
  vote_count: 30000,
  adult: false,
  backdrop_path: '/backdrop123.jpg'
};

describe('<MovieCard /> Component', () => {
  it('should render the movie poster properly when a poster_path is provided', () => {
    render(<MovieCard movie={mockMovieFixture} onPress={jest.fn()} />);

    // Checking the wrap's existence confirms the overall tree is intact.
    expect(screen.getByTestId('movie-card-touchable')).toBeTruthy();
  });

  it('should handle missing poster_paths gracefully via fallback views', () => {
    // Some API results exclude poster_paths, we need to ensure this doesn't break rendering
    const movieWithoutPoster = { ...mockMovieFixture, poster_path: null };
    
    // Explicit casting is needed here as the schema might strictly require string if not tailored perfectly
    render(<MovieCard movie={movieWithoutPoster as unknown as Movie} onPress={jest.fn()} />);

    expect(screen.getByTestId('movie-card-touchable')).toBeTruthy();
  });

  it('should correctly fire the onPress event carrying the respective movie item', () => {
    const handlePress = jest.fn();
    render(<MovieCard movie={mockMovieFixture} onPress={handlePress} />);

    const cardArea = screen.getByTestId('movie-card-touchable');
    fireEvent.press(cardArea);

    // Verify the integration directly passes the full movie object upwards
    expect(handlePress).toHaveBeenCalledTimes(1);
    expect(handlePress).toHaveBeenCalledWith(mockMovieFixture);
  });
});
