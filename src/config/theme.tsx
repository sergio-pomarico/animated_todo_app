import React, {ReactNode, useContext} from 'react';
import {ImageStyle, TextStyle, ViewStyle, FlexStyle} from 'react-native';
import {
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from '@shopify/restyle';

import {ChooseThemeContext} from '../context/theme-context';
import light from './light';
import dark from './light';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle | FlexStyle;
};

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const {theme} = useContext(ChooseThemeContext);
  return <ReStyleThemeProvider theme={theme}>{children}</ReStyleThemeProvider>;
};

export type Theme = typeof light | typeof dark;
export const useTheme = () => useReTheme<Theme>();

export const makeStyle =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const curretTheme = useTheme();
    return styles(curretTheme);
  };
