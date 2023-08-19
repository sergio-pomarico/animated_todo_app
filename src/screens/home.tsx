import React, {useCallback, useState} from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box} from '../shared/atoms';
import {Task} from '../shared/components/';

const HomeScreen = ({}: StackNavigationProps<MainRoutes, 'Home'>) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev);
  }, []);
  return (
    <Box flex={1} alignContent="center" backgroundColor="background">
      <Task isDone={checked} onToggleCheckbox={handlePressCheckbox} />
    </Box>
  );
};

export default HomeScreen;
