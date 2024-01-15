import React, {FC, useCallback, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FlatListProps,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {createBox} from '@shopify/restyle';
import {Theme} from '../../config/theme';
import {Task} from '../../data/task';
import TaskItem from './task';
import Swipeable from './swipeable';
import {Box} from '../atoms';

interface TasktListProps {
  data: Array<Task>;
  headerBarHeight: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onToggleItem: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const StyledFlatList = createBox<Theme, FlatListProps<Task>>(Animated.FlatList);

const ITEM_HEIGHT = 70;

const TaskList: FC<TasktListProps> = ({
  data,
  onDelete,
  onToggleItem,
  onScroll,
  headerBarHeight,
}) => {
  const scrollRef = useRef();
  const inset = useSafeAreaInsets();
  const renderItem = useCallback<ListRenderItem<Task>>(
    ({item}) => (
      <Swipeable
        onDelete={() => onDelete(item)}
        height={ITEM_HEIGHT}
        simultaneousHandlers={scrollRef}>
        <TaskItem
          {...item}
          onToggleCheckbox={() => onToggleItem(item)}
          height={ITEM_HEIGHT}
        />
      </Swipeable>
    ),
    [scrollRef, onToggleItem, onDelete],
  );
  return (
    <StyledFlatList
      data={data}
      renderItem={renderItem}
      ref={scrollRef}
      onScroll={onScroll}
      ListHeaderComponent={
        <Box>
          <>
            <Box width="100%" height={headerBarHeight + inset.top} />
          </>
        </Box>
      }
      scrollEventThrottle={16}
    />
  );
};

export default TaskList;
