import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message = 'An error occurred while fetching data.',
  onRetry,
}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#242A32', padding: 24 }}>
      <Text style={{ marginBottom: 16, textAlign: 'center', fontSize: 16, color: '#FFFFFF' }}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#0296E5',
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontWeight: '600', color: '#FFFFFF', fontSize: 14 }}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
