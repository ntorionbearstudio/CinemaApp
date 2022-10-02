import { theme } from 'native-base';

export const colors = {
  primary: 
  {
    50: '#fff9db',
    100: '#ffecae',
    200: '#fedf7f',
    300: '#fcd24e',
    400: '#fbc61e',
    500: '#e1ac04',
    600: '#af8600',
    700: '#7d6000',
    800: '#4c3900',
    900: '#1c1300',
  },
  secondary: theme.colors.amber,
  success: theme.colors.green,
  danger: theme.colors.red,
  error: theme.colors.red,
  warning: theme.colors.orange,

  // Set all grays to the same gray
  muted: theme.colors.coolGray,
  gray: theme.colors.coolGray,
  coolGray: theme.colors.coolGray,
  blueGray: theme.colors.coolGray,
  trueGray: theme.colors.coolGray,
  warmGray: theme.colors.coolGray,

  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },

  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },
};
