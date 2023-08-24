import React, {useContext} from 'react';

import {MainRoutes} from '../types/navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import AboutScreen from '../screens/about';
import {Drawer} from '../shared/components';
import {useTheme} from '../config/theme';
import {ChooseThemeContext} from '../context/theme-context';

const AppStack = createDrawerNavigator<MainRoutes>();

const MainStackNavigation = () => {
  const theme = useTheme();
  const {currentTheme} = useContext(ChooseThemeContext);
  const isDark = currentTheme === 'dark';
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={prop => <Drawer {...prop} />}
      screenOptions={{
        drawerType: 'back',
        headerStyle: {
          backgroundColor: theme.colors.appBarBackground,
        },
        headerTintColor: isDark ? theme.colors.white : theme.colors.black,
        headerShadowVisible: false,
      }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="About" component={AboutScreen} />
    </AppStack.Navigator>
  );
};

export default MainStackNavigation;
