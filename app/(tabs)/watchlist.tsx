import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useWatchlistContext } from '../../src/features/watchlist/WatchlistContext';
import { MovieListItem } from '../../src/shared/components/MovieListItem';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useTheme } from '../../src/core/theme/ThemeContext';
import { ThemeSwitcher } from '../../src/shared/components/ThemeSwitcher';
import { Header } from '../../src/shared/components/Header';
import { EmptyState } from '../../src/shared/components/EmptyState';

const magicBoxImg = require('../../assets/img/magic-box.png');

export default function WatchlistTab() {
  const { watchlist } = useWatchlistContext();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: isDark ? '#242A32' : '#FFFFFF' }}
    >
      <Header 
        title="Watch list" 
        showBackButton 
        rightComponent={<ThemeSwitcher />} 
      />

      {watchlist.length === 0 ? (
        <EmptyState 
          image={magicBoxImg}
          title="There Is No Movie Yet!"
          description="Find your movie by Type title, categories, years, etc"
        />
      ) : (
        <Animated.FlatList
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item }) => (
            <MovieListItem
              movie={item}
              onPress={(movie) => router.push(`/details/${movie.id}`)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
