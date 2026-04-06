import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../core/theme/ThemeContext';

interface EmptyStateProps {
  image: ImageSourcePropType;
  title: string;
  description?: string;
  imageSize?: number;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  image, 
  title, 
  description, 
  imageSize = 76 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={{ width: imageSize, height: imageSize, marginBottom: 16 }}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>
        {title}
      </Text>
      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  description: {
    color: '#92929D',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 48,
  },
});
