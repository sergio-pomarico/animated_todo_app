import React, {FC} from 'react';
import {useTheme} from '../../../config/theme';

import {Box, Touchable} from '../../atoms';
import Checkbox from '../checkbox';
import TaskLabel from './label';
import {Task} from '../../../data/task';

interface Props extends Task {
  onToggleCheckbox: () => void;
}

const TaskItem: FC<Props> = ({subject, done, onToggleCheckbox}) => {
  const theme = useTheme();
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="m"
      marginVertical="m">
      <Box width={32} height={32} mr="m">
        <Touchable onPress={onToggleCheckbox}>
          <Checkbox
            checked={done}
            checkmarkColor={theme.colors.white}
            boxOutlineColor={theme.colors.foreground}
            highlightColor={theme.colors.primary}
          />
        </Touchable>
      </Box>
      <TaskLabel
        strikethrough={done}
        inactiveTextColor={theme.colors.secondaryForeground}
        textColor={theme.colors.foreground}>
        {subject}
      </TaskLabel>
    </Box>
  );
};
export default TaskItem;
