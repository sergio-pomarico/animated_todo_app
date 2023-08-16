import React, {Dispatch, FC, ReactNode, createContext, useState} from 'react';
import {ColorSchemeName} from 'react-native';

import light from '../config/light';
import dark from '../config/dark';
import {Theme} from '../config/theme';

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

export const ChooseThemeContext = createContext<{
  currentTheme: ColorSchemeName;
  setCurrentTheme?: Dispatch<React.SetStateAction<ColorSchemeName>>;
  theme: Theme;
}>({
  currentTheme: 'light',
  theme: light,
});

export const ChooseThemeProvider: FC<{children: ReactNode}> = ({children}) => {
  const [currentTheme, setCurrentTheme] = useState<ColorSchemeName>('light');
  const theme = themes.find(t => t.id === currentTheme)?.theme ?? light;
  return (
    <ChooseThemeContext.Provider value={{currentTheme, setCurrentTheme, theme}}>
      {children}
    </ChooseThemeContext.Provider>
  );
};
