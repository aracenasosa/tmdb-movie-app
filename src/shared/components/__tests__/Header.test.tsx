import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Header } from '../Header';
import { ThemeProvider } from '../../../core/theme/ThemeContext';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';

// Helper to wrap components that rely on the theme hooks
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('<Header /> Component', () => {
  const mockRouter = useRouter();

  beforeEach(() => {
    // Clear out tracking counts between tests so isolated assertions don't leak failures
    jest.clearAllMocks();
  });

  it('should visually render the provided title correctly', () => {
    const titleText = 'Discover Movies';
    renderWithProviders(<Header title={titleText} />);
    
    // We expect the direct text to be discoverable in the DOM tree
    expect(screen.getByText(titleText)).toBeTruthy();
  });

  it('should not render a back button if the property is omitted', () => {
    renderWithProviders(<Header title="Home Screen" />);
    
    // queryByTestId returns null instead of throwing an error when an element is absent,
    // which makes it ideal for asserting negative conditions
    expect(screen.queryByTestId('back-btn')).toBeNull();
  });

  it('should render the back button explicitly when the showBackButton flag is passed', () => {
    renderWithProviders(<Header title="Details View" showBackButton />);
    
    expect(screen.getByTestId('back-btn')).toBeTruthy();
  });

  it('should correctly fire router.back() whenever the user taps the left back button', () => {
    renderWithProviders(<Header title="Details View" showBackButton />);
    
    const backBtn = screen.getByTestId('back-btn');
    fireEvent.press(backBtn);
    
    // Validate that the system properly initiates navigation back via expo-router
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('should safely render a custom right-sided accessory component if supplied', () => {
    const CustomFilterButton = <Text testID="custom-filter-action">Filter</Text>;
    
    renderWithProviders(<Header title="Results" rightComponent={CustomFilterButton} />);

    // Check we can locate both the text string and the testID inside the right boundary
    expect(screen.getByTestId('custom-filter-action')).toBeTruthy();
    expect(screen.getByText('Filter')).toBeTruthy();
  });
});
