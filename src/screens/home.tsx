import React from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {ScrollView, Text, View} from 'react-native';

const HomeScreen = ({}: StackNavigationProps<MainRoutes, 'Home'>) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <Text>Home</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
