import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie, MovieDetails } from '../../core/types/movie';
import { useTheme } from '../../core/theme/ThemeContext';
import Animated, { FadeInRight, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';



interface MovieListItemProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieListItem: React.FC<MovieListItemProps> = ({ movie, onPress }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;

  const title = movie.title || movie.name || 'Untitled';
  const year = movie.release_date ? movie.release_date.split('-')[0] : '—';
  
  const runtime = (movie as unknown as MovieDetails).runtime ? `${(movie as unknown as MovieDetails).runtime} Minutes` : null;

  const scale = useSharedValue(1);
  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View entering={FadeInRight.duration(400).springify()}>
      <Animated.View style={animatedScaleStyle}>
        <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={() => onPress(movie)}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require('../../../assets/img/splash-screen.png')
        }
        style={{
          width: 95,
          height: 120,
          borderRadius: 16,
          backgroundColor: '#3A3F47',
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
        <Text
          style={{ 
            color: isDark ? '#FFFFFF' : '#111827', 
            fontSize: 16, 
            fontWeight: '600' 
          }}
          numberOfLines={2}
        >
          {title}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Ionicons name="star" size={14} color="#FF8700" />
          <Text style={{ color: '#FF8700', fontSize: 13, fontWeight: '600', marginLeft: 4 }}>
            {movie.vote_average?.toFixed(1) || '0.0'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Ionicons name="film-outline" size={14} color="#92929D" />
          <Text style={{ color: '#92929D', fontSize: 13, marginLeft: 4 }}>
            Action
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Ionicons name="calendar-outline" size={14} color="#92929D" />
          <Text style={{ color: '#92929D', fontSize: 13, marginLeft: 4 }}>
            {year}
          </Text>
        </View>

        {runtime && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Ionicons name="time-outline" size={14} color="#92929D" />
            <Text style={{ color: '#92929D', fontSize: 13, marginLeft: 4 }}>
              {runtime}
            </Text>
          </View>
        )}
      </View>
      </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
