import React from 'react';

import {MainRoutes} from '../types/navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import AboutScreen from '../screens/about';
import Drawer from '../shared/components/drawer';

const AppStack = createDrawerNavigator<MainRoutes>();

const MainStackNavigation = () => (
  <AppStack.Navigator
    initialRouteName="Home"
    // eslint-disable-next-line react/no-unstable-nested-components
    drawerContent={prop => <Drawer {...prop} />}
    screenOptions={{
      drawerType: 'back',
    }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="About" component={AboutScreen} />
  </AppStack.Navigator>
);

export default MainStackNavigation;
