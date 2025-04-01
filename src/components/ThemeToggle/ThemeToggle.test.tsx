import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

describe('ThemeToggle Component', () => {
  test('renders with moon icon in light mode', () => {
    Storage.prototype.getItem = jest.fn(() => 'light');

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByTestId('toggle--button')).toHaveTextContent('🌙');
  });

  test('renders with sun icon in dark mode', () => {
    Storage.prototype.getItem = jest.fn(() => 'dark');

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByTestId('toggle--button')).toHaveTextContent('☀️');
  });

  test('toggles theme when button is clicked', () => {
    Storage.prototype.getItem = jest.fn(() => 'light');
    Storage.prototype.setItem = jest.fn();

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByTestId('toggle--button')).toHaveTextContent('🌙');

    fireEvent.click(screen.getByTestId('toggle--button'));

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});
