import { Tabs } from 'expo-router';
import { useTheme } from '../../src/core/theme/ThemeContext';
import { Image } from 'react-native';

const homeIcon = require('../../assets/img/home.png');
const searchIcon = require('../../assets/img/search.png');
const watchlistIcon = require('../../assets/img/save-empty.png');

export default function TabLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#242A32' : '#FFFFFF',
          borderTopColor: isDark ? '#0296E5' : '#E5E7EB',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#0296E5',
        tabBarInactiveTintColor: isDark ? '#67686D' : '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={homeIcon}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={searchIcon}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watch list',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={watchlistIcon}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
