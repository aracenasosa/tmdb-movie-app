import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../../core/types/movie';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  width?: number;
  height?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  width = 150,
  height = 225,
}) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const scale = useSharedValue(1);
  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View entering={FadeInUp.duration(400).springify().damping(14)}>
      <AnimatedTouchable
        testID="movie-card-touchable"
        activeOpacity={0.9}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={() => onPress(movie)}
      style={[animatedScaleStyle, { width, borderRadius: 16, overflow: 'hidden' }]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height, borderRadius: 16, backgroundColor: '#3A3F47' }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: '100%',
            height,
            borderRadius: 16,
            backgroundColor: '#3A3F47',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="image-outline" size={32} color="#67686D" />
        </View>
      )}
      </AnimatedTouchable>
    </Animated.View>
  );
};
