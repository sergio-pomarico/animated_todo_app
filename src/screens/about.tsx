import React from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box, Text} from '../shared/atoms';

const AboutScreen = ({}: StackNavigationProps<MainRoutes, 'About'>) => {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignContent="center"
      backgroundColor="background">
      <Text textAlign="center">About</Text>
    </Box>
  );
};

export default AboutScreen;
