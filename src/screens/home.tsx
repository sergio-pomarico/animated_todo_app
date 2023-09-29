import React, {useCallback, useRef, useState} from 'react';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box} from '../shared/atoms';
import TaskList from '../shared/components/task-list';
import tasks, {Task} from '../data/task';
import {BottomSheet, FloatingActionButton} from '../shared/components';
import {
  BottomSheetRefProps,
  MAX_TRANSLATE_Y,
} from '../shared/components/bottom-sheet';

const HomeScreen = ({}: StackNavigationProps<MainRoutes, 'Home'>) => {
  const ref = useRef<BottomSheetRefProps>(null);

  const onPressFloatingActionButton = useCallback(() => {
    const isActive = ref.current?.isActive();
    if (isActive) {
      ref.current?.scrollTo(0);
    } else {
      ref.current?.scrollTo(MAX_TRANSLATE_Y * 0.6);
    }
  }, []);

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
      <FloatingActionButton onPress={onPressFloatingActionButton} />
      <BottomSheet ref={ref} />
    </Box>
  );
};

export default HomeScreen;
