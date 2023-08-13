import React from 'react';

import {MainRoutes} from '../types/navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import AboutScreen from '../screens/about';

const AppStack = createDrawerNavigator<MainRoutes>();

const MainStackNavigation = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="About" component={AboutScreen} />
  </AppStack.Navigator>
);

export default MainStackNavigation;
