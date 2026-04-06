import React, { createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { View } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();

  // On mount, load from storage, default to 'dark'
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setColorScheme(savedTheme);
        } else {
          setColorScheme('dark');
        }
      } catch (e) {
        console.error('Failed to load theme', e);
        setColorScheme('dark');
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (newTheme: Theme) => {
    setColorScheme(newTheme);
    try {
      await AsyncStorage.setItem('@theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  const toggleTheme = () => {
    setTheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <View className={`flex-1 ${theme === 'dark' ? 'dark' : ''}`}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

