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
  colors: {
    black: palette.black,
    white: palette.white,
    red: palette.red,
    blue: palette.blue,
    yellow: palette.yellow,
    primary: palette.blue70,
    background: palette.paper10,
    foreground: palette.paper900,
  },
  spacing: {
    xs: 8,
    sm: 12,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
  },
  textVariants: {},
});

export default theme;
