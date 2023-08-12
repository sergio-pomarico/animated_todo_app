import React from 'react';
import Navigation from './routes/main';
import {ThemeProvider} from './config/theme';

const App = () => (
  <ThemeProvider>
    <Navigation />
  </ThemeProvider>
);

export default App;
