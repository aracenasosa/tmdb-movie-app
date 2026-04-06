import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../core/theme/ThemeContext';

export type CategoryTab = 'nowPlaying' | 'upcoming' | 'topRated';

interface CategoryTabsProps {
  activeTab: CategoryTab;
  onTabPress: (tab: CategoryTab) => void;
}

const tabs: { key: CategoryTab; label: string }[] = [
  { key: 'nowPlaying', label: 'Now Playing' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'topRated', label: 'Top Rated' },
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabPress }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item: tab }) => (
          <TouchableOpacity
            onPress={() => onTabPress(tab.key)}
            style={[
              styles.tabItem,
              {
                borderBottomColor:
                  activeTab === tab.key 
                    ? (isDark ? '#3A3F47' : '#111827') 
                    : 'transparent',
              }
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.key
                    ? (isDark ? '#FFFFFF' : '#111827')
                    : '#67686D',
                  fontWeight: activeTab === tab.key ? '600' : '400',
                }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  tabItem: {
    paddingBottom: 8,
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 14,
  },
});
