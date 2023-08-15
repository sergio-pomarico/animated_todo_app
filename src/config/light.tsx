import {createTheme} from '@shopify/restyle';

const palette = {
  white: 'white',
  black: 'black',
  red: 'red',
  blue: 'blue',
  yellow: 'yellow',
  paper00: '#ffffff',
  paper10: '#f5f5f4',
  paper20: '#e6e6e6',
  paper100: '#aeaeae',
  paper300: '#767577',
  paper900: '#202020',
  blue70: '#2185d0',
  navy20: '#171a21',
  navy900: '#b9babc',
};

const theme = createTheme({
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  spacing: {
    xs: 8,
    sm: 12,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
  },
  colors: {
    black: palette.black,
    white: palette.white,
    red: palette.red,
    blue: palette.blue,
    yellow: palette.yellow,
    primary: palette.blue70,
    background: palette.paper10,
    foreground: palette.paper900,
    secondaryForeground: palette.paper100,
    sidebarBackground: palette.navy20,
    sidebarForeground: palette.navy900,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 24,
    xl: 64,
  },
  textVariants: {
    defaults: {
      color: 'foreground',
      fontSize: 16,
      lineHeight: 18,
    },
    sidebar: {
      color: 'sidebarForeground',
      fontSize: 16,
      lineHeight: 18,
    },
  },
});

export default theme;
