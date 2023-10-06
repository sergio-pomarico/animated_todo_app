import React, {ReactNode} from 'react';
import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  FlexStyle,
  ColorSchemeName,
} from 'react-native';
import {
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from '@shopify/restyle';

import light from './light';
import dark from './dark';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

interface MetaTheme {
  id: ColorSchemeName;
  theme: Theme;
}

const themes: MetaTheme[] = [
  {
    id: 'light',
    theme: light,
  },
  {
    id: 'dark',
    theme: dark,
  },
];

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle | FlexStyle;
};

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const {theme: currentTheme} = useSelector((state: RootState) => state.ui);
  const choosenTheme = themes.find(t => t.id === currentTheme)?.theme;
  return (
    <ReStyleThemeProvider theme={choosenTheme}>{children}</ReStyleThemeProvider>
  );
};

export type Theme = typeof light | typeof dark;
export const useTheme = () => useReTheme<Theme>();

export const makeStyle =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const curretTheme = useTheme();
    return styles(curretTheme);
  };
