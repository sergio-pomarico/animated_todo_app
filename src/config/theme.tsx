import React, {ReactNode} from 'react';
import {
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from '@shopify/restyle';
import {ImageStyle, TextStyle, ViewStyle, FlexStyle} from 'react-native';
import theme from './light';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle | FlexStyle;
};

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
