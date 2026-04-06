import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMovieCategories } from '../../src/features/home/hooks/useMovieCategories';
import { LoadingSpinner } from '../../src/shared/components/LoadingSpinner';
import { ErrorView } from '../../src/shared/components/ErrorView';
import { useTheme } from '../../src/core/theme/ThemeContext';
import { ThemeSwitcher } from '../../src/shared/components/ThemeSwitcher';
import { CategoryTabs, CategoryTab } from '../../src/features/home/components/CategoryTabs';
import { MovieCard } from '../../src/shared/components/MovieCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POSTER_WIDTH = SCREEN_WIDTH * 0.42;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

export default function HomeTab() {
  const { popular, nowPlaying, upcoming, topRated, loading, error, refetch } =
    useMovieCategories();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<CategoryTab>('nowPlaying');

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorView message={error} onRetry={refetch} />;

  const activeMovies = activeTab === 'nowPlaying' ? nowPlaying : activeTab === 'upcoming' ? upcoming : topRated;


  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: isDark ? '#242A32' : '#FFFFFF' }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor="#0296E5" />
        }
        data={activeMovies}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ 
          justifyContent: 'space-between', 
          paddingHorizontal: 20, 
          marginBottom: 16 
        }}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 24,
                paddingTop: 8,
              }}
            >
              <Text
                style={{
                  color: isDark ? '#FFFFFF' : '#111827',
                  fontSize: 18,
                  fontWeight: '600',
                  flex: 1,
                  lineHeight: 26,
                }}
              >
                What do you want to watch?
              </Text>
              <ThemeSwitcher />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/search')}
              style={{
                marginHorizontal: 24,
                marginTop: 16,
                marginBottom: 24,
                backgroundColor: isDark ? '#3A3F47' : '#E8E8E8',
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 14,
              }}
            >
              <Image
                source={require('../../assets/img/search.png')}
                style={{ width: 16, height: 16, tintColor: '#67686D' }}
              />
              <Text style={{ color: '#67686D', fontSize: 14, marginLeft: 10, flex: 1 }}>
                Search
              </Text>
            </TouchableOpacity>

            <FlatList
              data={popular.slice(0, 10)}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push(`/details/${item.id}`)}
                  style={{
                    marginRight: 16,
                    width: POSTER_WIDTH,
                    position: 'relative',
                  }}
                >
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: -8,
                      left: -10,
                      fontSize: 96,
                      fontWeight: '900',
                      color: isDark ? '#242A32' : '#FFFFFF',
                      zIndex: 1,
                      textShadowColor: '#0296E5',
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 0,
                      letterSpacing: -2,
                    }}
                  >
                    {index + 1}
                  </Text>

                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                    style={{
                      width: POSTER_WIDTH,
                      height: POSTER_HEIGHT,
                      borderRadius: 16,
                      backgroundColor: '#3A3F47',
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />

            <CategoryTabs activeTab={activeTab} onTabPress={setActiveTab} />

            <View style={{ height: 1, backgroundColor: isDark ? '#3A3F47' : '#E5E7EB', marginHorizontal: 24, marginBottom: 16 }} />
          </>
        }
        renderItem={({ item: movie }) => {
          const itemWidth = Math.floor((SCREEN_WIDTH - 40 - 30) / 3); 
          return (
            <View style={{ width: itemWidth }}>
              <MovieCard 
                movie={movie} 
                onPress={(m) => router.push(`/details/${m.id}`)} 
                width={itemWidth} 
                height={itemWidth * 1.5} 
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
