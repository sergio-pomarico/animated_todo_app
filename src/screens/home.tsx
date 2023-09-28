import React, {useCallback, useState} from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box} from '../shared/atoms';
import TaskList from '../shared/components/task-list';
import tasks, {Task} from '../data/task';

const HomeScreen = ({}: StackNavigationProps<MainRoutes, 'Home'>) => {
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
  const handleRemoveItem = useCallback((item: Task) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);
  return (
    <Box flex={1} alignContent="center" backgroundColor="background">
      <TaskList
        data={data}
        onToggleItem={handleToggleTaskItem}
        onDelete={handleRemoveItem}
      />
    </Box>
  );
};

export default HomeScreen;
