import React, {useCallback, useState} from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import Box from '../shared/atoms/box';
import Task from '../shared/components/task';

const HomeScreen = ({}: StackNavigationProps<MainRoutes, 'Home'>) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev);
  }, []);
  return (
    <Box flex={1} alignContent="center" backgroundColor="white">
      <Task isDone={checked} onToggleCheckbox={handlePressCheckbox} />
    </Box>
  );
};

export default HomeScreen;
