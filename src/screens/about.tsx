import React from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {ScrollView, Text, View} from 'react-native';

const AboutScreen = ({}: StackNavigationProps<MainRoutes, 'About'>) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <Text>About</Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
