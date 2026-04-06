import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSearch } from '../../src/features/search/hooks/useSearch';
import { MovieListItem } from '../../src/shared/components/MovieListItem';
import { useTheme } from '../../src/core/theme/ThemeContext';
import { ThemeSwitcher } from '../../src/shared/components/ThemeSwitcher';
import { Ionicons } from '@expo/vector-icons';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { Header } from '../../src/shared/components/Header';
import { EmptyState } from '../../src/shared/components/EmptyState';

const noResultsImg = require('../../assets/img/no-results.png');

export default function SearchTab() {
  const { query, setQuery, results, loading } = useSearch();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: isDark ? '#242A32' : '#FFFFFF' }}
    >
      <Header 
        title="Search" 
        showBackButton 
        rightComponent={<ThemeSwitcher />} 
      />

      <View
        style={{
          marginHorizontal: 24,
          marginBottom: 16,
          backgroundColor: isDark ? '#3A3F47' : '#E8E8E8',
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: isDark ? '#FFFFFF' : '#111827',
            fontSize: 14,
          }}
          placeholder="Search"
          placeholderTextColor="#67686D"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 ? (
          <TouchableOpacity onPress={() => setQuery('')} style={{ padding: 4 }}>
            <Ionicons name="close" size={20} color="#67686D" />
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../../assets/img/search.png')}
            style={{ width: 16, height: 16, tintColor: '#67686D', marginHorizontal: 4 }}
          />
        )}
      </View>

      {loading && (
        <View style={{ paddingTop: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0296E5" />
        </View>
      )}

      {!loading && query.length > 0 && results.length === 0 && (
        <EmptyState 
          image={noResultsImg}
          title="We Are Sorry, We Can Not Find The Movie :("
          description="Find your movie by Type title, categories, years, etc"
        />
      )}

      {!loading && query.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
          <Ionicons
            name="search-outline"
            size={80}
            color="#67686D"
            style={{ opacity: 0.5, marginBottom: 16 }}
          />
          <Text style={{ color: '#92929D', fontSize: 16 }}>Type to search for movies</Text>
        </View>
      )}

      {!loading && results.length > 0 && (
        <Animated.FlatList
          data={results}
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
