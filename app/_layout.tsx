import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider as NavigationThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider, useTheme } from '../src/core/theme/ThemeContext';
import { WatchlistProvider } from '../src/features/watchlist/WatchlistContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, backgroundColor: isDark ? '#242A32' : '#FFFFFF' }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: isDark ? '#242A32' : '#FFFFFF',
              },
              animation: 'slide_from_right',
            }}
          >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="details/[id]"
            options={{
              headerShown: false,
            }}
          />
          </Stack>
        </View>
      </NavigationThemeProvider>
      <StatusBar style="light" />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <WatchlistProvider>
          <RootSiblingParent>
            <RootLayoutNav />
          </RootSiblingParent>
        </WatchlistProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
