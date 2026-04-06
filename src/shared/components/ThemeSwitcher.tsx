import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../core/theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ padding: 8 }}>
      <Ionicons
        name={theme === 'dark' ? 'sunny' : 'moon'}
        size={22}
        color={theme === 'dark' ? '#FFFFFF' : '#111827'}
      />
    </TouchableOpacity>
  );
};
