import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigation from './main';

export default () => {
  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
};
