import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {ThemeProvider} from './config/theme';
import Navigation from './routes';
import store from './store/reducer';
import {StatusBar} from './shared/components';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <ThemeProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
