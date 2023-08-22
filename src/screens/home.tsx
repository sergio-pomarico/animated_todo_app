import React, {useCallback, useState} from 'react';
import {DrawerActions} from '@react-navigation/native';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box} from '../shared/atoms';
import HeaderBar from '../shared/components/header-bar';
import TaskList from '../shared/components/task-list';
import tasks, {Task} from '../data/task';

const HomeScreen = ({navigation}: StackNavigationProps<MainRoutes, 'Home'>) => {
  const [data, setData] = useState<Array<Task>>(tasks);
  const handleToggleTaskItem = useCallback((item: Task) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);
  const handleToggleDrawer = () =>
    navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Box flex={1} alignContent="center" backgroundColor="background">
      <HeaderBar onPress={handleToggleDrawer} />
      <TaskList data={data} onToggleItem={handleToggleTaskItem} />
    </Box>
  );
};

export default HomeScreen;
