import React, {ReactNode} from 'react';
import {
  createTheme,
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from '@shopify/restyle';
import {ImageStyle, TextStyle, ViewStyle, FlexStyle} from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle | FlexStyle;
};

const theme = createTheme({
  spacing: {
    xs: 8,
    sm: 12,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
  },
  colors: {},
  textVariants: {},
});

export const ThemeProvider = ({children}: {children: ReactNode}) => (
  <ReStyleThemeProvider theme={theme}>{children}</ReStyleThemeProvider>
);

export type Theme = typeof theme;
export const useTheme = () => useReTheme<Theme>();

export const makeStyle =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const curretTheme = useTheme();
    return styles(curretTheme);
  };

export default theme;
