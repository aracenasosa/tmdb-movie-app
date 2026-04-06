import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../core/theme/ThemeContext';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  rightComponent 
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.iconButton}>
            <Image
              source={require('../../../assets/img/arrow-left.png')}
              style={[styles.backIcon, { tintColor: isDark ? '#FFF' : '#111' }]}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 4,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
