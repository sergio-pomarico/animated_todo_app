import React, {useCallback, useState} from 'react';
import {DrawerActions} from '@react-navigation/native';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box} from '../shared/atoms';
import {Task} from '../shared/components/';
import HeaderBar from '../shared/components/header-bar';

const HomeScreen = ({navigation}: StackNavigationProps<MainRoutes, 'Home'>) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev);
  }, []);
  const handleToggleDrawer = () =>
    navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Box flex={1} alignContent="center" backgroundColor="background">
      <HeaderBar onPress={handleToggleDrawer} />
      <Task isDone={checked} onToggleCheckbox={handlePressCheckbox} />
    </Box>
  );
};

export default HomeScreen;
