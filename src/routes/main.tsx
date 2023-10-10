import React from 'react';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';

import {MainRoutes} from '../types/navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import AboutScreen from '../screens/about';
import {Drawer} from '../shared/components';
import {useTheme} from '../config/theme';

const AppStack = createDrawerNavigator<MainRoutes>();

const MainStackNavigation = () => {
  const theme = useTheme();
  const {theme: currentTheme} = useSelector((state: RootState) => state.ui);
  const isDark = currentTheme === 'dark';
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={prop => <Drawer {...prop} />}
      screenOptions={{
        drawerType: 'back',
        drawerActiveBackgroundColor: 'transparent',
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
