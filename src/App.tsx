import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './routes';
import {ThemeProvider} from './config/theme';
import {ChooseThemeProvider} from './context/theme-context';

const App = () => {
  return (
    <ChooseThemeProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </ChooseThemeProvider>
  );
};

export default App;
