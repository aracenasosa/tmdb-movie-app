import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useMovieDetails } from '../../src/features/details/hooks/useMovieDetails';
import { LoadingSpinner } from '../../src/shared/components/LoadingSpinner';
import { ErrorView } from '../../src/shared/components/ErrorView';
import { Ionicons } from '@expo/vector-icons';
import { useWatchlistContext } from '../../src/features/watchlist/WatchlistContext';
import { useTheme } from '../../src/core/theme/ThemeContext';
import Toast from 'react-native-root-toast';
import YoutubeIframe from 'react-native-youtube-iframe';
import { Header } from '../../src/shared/components/Header';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const saveEmpty = require('../../assets/img/save-empty.png');
const saveFill = require('../../assets/img/save-fill.png');

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = parseInt(id, 10);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { details, trailer, loading, error, refetch } = useMovieDetails(movieId);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistContext();
  const [showTrailer, setShowTrailer] = React.useState(false);

  const handleWatchlistPress = () => {
    if (!details) return;
    if (isInWatchlist(details.id)) {
      removeFromWatchlist(details.id);
      Toast.show('Removed from Watchlist', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#3A3F47',
        textColor: '#FFFFFF',
        shadow: false,
      });
    } else {
      addToWatchlist({
        ...details,
        genre_ids: details.genres ? details.genres.map((g: { id: number }) => g.id) : [],
      });
      Toast.show('Added to Watchlist!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#0296E5',
        textColor: '#FFFFFF',
        shadow: false,
      });
    }
  };

  const handleTrailerPress = () => {
    if (trailer?.key) {
      setShowTrailer(true);
    } else {
      Toast.show('Trailer not available', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#3A3F47',
        textColor: '#FFFFFF',
        shadow: false,
      });
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (error || !details)
    return <ErrorView message={error || 'Failed to load'} onRetry={refetch} />;

  const isSaved = isInWatchlist(details.id);
  const title = details.title || details.name || 'Untitled';
  const year = details.release_date ? details.release_date.split('-')[0] : '—';
  const runtime = details.runtime ? `${details.runtime} Minutes` : null;
  const genreText = details.genres && details.genres.length > 0 ? details.genres[0].name : '—';
  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w300${details.poster_path}`
    : null;
  const backdropUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${details.backdrop_path}`
    : posterUrl; 


  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#242A32' : '#FFFFFF' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Header 
            title="Detail" 
            showBackButton 
            rightComponent={
              <TouchableOpacity onPress={handleWatchlistPress} style={{ padding: 4 }}>
                {isSaved ? (
                  <Image
                    key="saved-icon"
                    source={saveFill}
                    style={{ 
                      width: 24, 
                      height: 28,
                      tintColor: isDark ? '#FFFFFF' : '#111827'
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    key="empty-icon"
                    source={saveEmpty}
                    style={{ 
                      width: 24, 
                      height: 28,
                      tintColor: isDark ? '#FFFFFF' : '#111827'
                    }}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            }
          />

          <View style={{ paddingHorizontal: 24, position: 'relative', marginTop: 8 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleTrailerPress}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: '#3A3F47',
                width: '100%',
                height: 210,
              }}
            >
              {backdropUrl ? (
                <Image
                  source={{ uri: backdropUrl }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="image-outline" size={48} color="#67686D" />
                </View>
              )}

              <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />

              {trailer && (
                <View
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -30 }, { translateY: -30 }],
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                >
                  <Ionicons name="play" size={32} color="#FFFFFF" style={{ marginLeft: 4 }} />
                </View>
              )}

              <View
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  backgroundColor: 'rgba(36,42,50,0.8)',
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="star" size={12} color="#FF8700" />
                <Text
                  style={{
                    color: '#FF8700',
                    fontSize: 12,
                    fontWeight: '700',
                    marginLeft: 4,
                  }}
                >
                  {details.vote_average?.toFixed(1) || '0.0'}
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                bottom: -50,
                left: 40,
                width: 95,
                height: 120,
                borderRadius: 16,
                backgroundColor: '#3A3F47',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              {posterUrl && (
                <Image
                  source={{ uri: posterUrl }}
                  style={{ width: '100%', height: '100%', borderRadius: 16 }}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>

          <View
            style={{
              marginLeft: 151,
              marginTop: 16,
              minHeight: 50,
              justifyContent: 'center',
              paddingRight: 24,
            }}
          >
            <Text
              style={{
                color: isDark ? '#FFFFFF' : '#111827',
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 24,
              }}
            >
              {title}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 32,
              marginHorizontal: 24,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="calendar-outline" size={14} color="#92929D" />
              <Text style={{ color: '#92929D', fontSize: 13, marginLeft: 4 }}>{year}</Text>
            </View>

            <Text style={{ color: '#92929D', marginHorizontal: 4 }}>|</Text>

            {runtime && (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="time-outline" size={14} color="#92929D" />
                  <Text style={{ color: '#92929D', fontSize: 13, marginLeft: 4 }}>
                    {runtime}
                  </Text>
                </View>
                <Text style={{ color: '#92929D', marginHorizontal: 4 }}>|</Text>
              </>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}>
              <Ionicons name="film-outline" size={14} color="#92929D" />
              <Text
                style={{ color: '#92929D', fontSize: 13, marginLeft: 4, flexShrink: 1 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {genreText}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: isDark ? '#3A3F47' : '#E5E7EB',
              marginHorizontal: 24,
              marginTop: 20,
            }}
          />

          <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
            <Text
              style={{
                color: isDark ? '#FFFFFF' : '#111827',
                fontSize: 14,
                lineHeight: 22,
              }}
            >
              {details.overview || 'No overview available.'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {showTrailer && trailer?.key && (
        <View
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', top: 50, right: 20, zIndex: 101, padding: 8 }}
            onPress={() => setShowTrailer(false)}
          >
            <Ionicons name="close-circle" size={36} color="#FFFFFF" />
          </TouchableOpacity>
          <YoutubeIframe
            height={SCREEN_WIDTH * 0.5625}
            videoId={trailer.key}
            play={true}
            forceAndroidAutoplay={true}
          />
        </View>
      )}
    </View>
  );
}
