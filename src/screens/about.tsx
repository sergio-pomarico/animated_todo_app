import React from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import Box from '../shared/atoms/box';
import Text from '../shared/atoms/text';

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
