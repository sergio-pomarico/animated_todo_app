import React, {FC, useCallback, useRef} from 'react';
import {FlatList, FlatListProps, ListRenderItem} from 'react-native';

import {createBox} from '@shopify/restyle';
import {Theme} from '../../config/theme';
import {Task} from '../../data/task';
import TaskItem from './task';
import Swipeable from './swipeable';

interface TasktListProps {
  data: Array<Task>;
  onToggleItem: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const StyledFlatList = createBox<Theme, FlatListProps<Task>>(FlatList);

const ITEM_HEIGHT = 70;

const TaskList: FC<TasktListProps> = ({data, onDelete, onToggleItem}) => {
  const scrollRef = useRef();
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
  return <StyledFlatList data={data} renderItem={renderItem} ref={scrollRef} />;
};

export default TaskList;
