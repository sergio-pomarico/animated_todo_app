import React, {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {DrawerActions} from '@react-navigation/native';
import {MainRoutes, StackNavigationProps} from '../types/navigation';
import {Box} from '../shared/atoms';
import {Task} from '../data/task';
import {
  BottomSheet,
  FloatingActionButton,
  TaskList,
  HeaderBar,
} from '../shared/components';
import {
  BottomSheetRefProps,
  MAX_TRANSLATE_Y,
} from '../shared/components/bottom-sheet';
import {RootState} from '../types/redux';
import {deleteTask, updateTask} from '../store/task';
import useStickyHeader from '../hooks/sticky-header';
import CreateTask from '../shared/forms/addTasks';

const HomeScreen = ({navigation}: StackNavigationProps<MainRoutes, 'Home'>) => {
  const ref = useRef<BottomSheetRefProps>(null);
  const {handleScroll, headerBarStyle, headerBarHeight, handleNoteListLayout} =
    useStickyHeader();
  const {tasks} = useSelector((store: RootState) => store.task);

  const toggleNavigation = () => {
    const {dispatch} = navigation;
    dispatch(DrawerActions.toggleDrawer());
  };
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
      <HeaderBar
        onPress={toggleNavigation}
        style={headerBarStyle}
        onLayout={handleNoteListLayout}
      />
      <TaskList
        data={tasks}
        onToggleItem={handleToggleTaskItem}
        onDelete={handleRemoveItem}
        onScroll={handleScroll}
        headerBarHeight={headerBarHeight}
      />
      <FloatingActionButton onPress={onPressFloatingActionButton} />
      <BottomSheet ref={ref}>
        <CreateTask />
      </BottomSheet>
    </Box>
  );
};

export default HomeScreen;
