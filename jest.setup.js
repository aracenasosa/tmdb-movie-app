require('react-native-reanimated').setUpTests?.();
require('expo');
try {
  global.__ExpoImportMetaRegistry;
  global.URL;
  global.URLSearchParams;
  global.TextDecoder;
  global.TextDecoderStream;
  global.TextEncoderStream;
  global.structuredClone;
} catch (e) {}

jest.mock('expo-router', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  };
  return {
    useRouter: () => mockRouter,
    useLocalSearchParams: () => ({ id: '1' }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  AntDesign: 'AntDesign',
}));

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest.fn().mockImplementation(({ children }) => children(inset)),
    SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
    useSafeAreaInsets: jest.fn().mockReturnValue(inset),
  };
});

jest.mock('nativewind', () => ({
  useColorScheme: () => ({
    colorScheme: 'dark',
    setColorScheme: jest.fn(),
  }),
}));
