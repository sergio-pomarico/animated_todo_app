import React, {FC, useCallback} from 'react';
import {FlatList, FlatListProps, ListRenderItem} from 'react-native';

import {createBox} from '@shopify/restyle';
import {Theme} from '../../config/theme';
import {Task} from '../../data/task';
import TaskItem from './task';

interface TasktListProps {
  data: Array<Task>;
  onToggleItem: (task: Task) => void;
}

const StyledFlatList = createBox<Theme, FlatListProps<Task>>(FlatList);

const TaskList: FC<TasktListProps> = ({data, onToggleItem}) => {
  const renderItem = useCallback<ListRenderItem<Task>>(
    ({item}) => (
      <TaskItem {...item} onToggleCheckbox={() => onToggleItem(item)} />
    ),
    [onToggleItem],
  );
  return <StyledFlatList data={data} renderItem={renderItem} />;
};

export default TaskList;
