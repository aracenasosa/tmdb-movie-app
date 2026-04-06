import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  return (
    <View
      style={{
        flex: fullScreen ? 1 : undefined,
        backgroundColor: fullScreen ? '#242A32' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: fullScreen ? 0 : 16,
      }}
    >
      <ActivityIndicator size="large" color="#0296E5" />
    </View>
  );
};
