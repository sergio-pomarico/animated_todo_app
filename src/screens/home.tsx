import React, {useCallback, useRef} from 'react';

import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box} from '../shared/atoms';
import {Task} from '../data/task';
import {
  BottomSheet,
  FloatingActionButton,
  TaskList,
} from '../shared/components';
import {
  BottomSheetRefProps,
  MAX_TRANSLATE_Y,
} from '../shared/components/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../types/redux';
import {deleteTask, updateTask} from '../store/task';

const HomeScreen = ({}: StackNavigationProps<MainRoutes, 'Home'>) => {
  const ref = useRef<BottomSheetRefProps>(null);
  const {tasks} = useSelector((store: RootState) => store.task);
  const dispatch = useDispatch();

  const onPressFloatingActionButton = useCallback(() => {
    const isActive = ref.current?.isActive();
    if (isActive) {
      ref.current?.scrollTo(0);
    } else {
      ref.current?.scrollTo(MAX_TRANSLATE_Y * 0.6);
    }
  }, []);

  const handleToggleTaskItem = useCallback(
    (item: Task) => {
      dispatch(updateTask(item.id));
    },
    [dispatch],
  );

  const handleRemoveItem = useCallback(
    (item: Task) => {
      dispatch(deleteTask(item.id));
    },
    [dispatch],
  );

  return (
    <Box flex={1} alignContent="center" backgroundColor="background">
      <TaskList
        data={tasks}
        onToggleItem={handleToggleTaskItem}
        onDelete={handleRemoveItem}
      />
      <FloatingActionButton onPress={onPressFloatingActionButton} />
      <BottomSheet ref={ref} />
    </Box>
  );
};

export default HomeScreen;
