import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainRoutes} from '../types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';

const AppStack = createNativeStackNavigator<MainRoutes>();

export default () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="Home" component={HomeScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
