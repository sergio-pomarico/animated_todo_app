import React from 'react';
import Navigation from './routes';
import {ThemeProvider} from './config/theme';
import {ChooseThemeProvider} from './context/theme-context';

const App = () => {
  return (
    <ChooseThemeProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </ChooseThemeProvider>
  );
};

export default App;
