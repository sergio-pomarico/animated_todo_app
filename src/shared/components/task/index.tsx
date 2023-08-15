import React, {FC} from 'react';
import {useTheme} from '../../../config/theme';

import Touchable from '../../atoms/touchable';
import Box from '../../atoms/box';
import Checkbox from '../checkbox';
import TaskLabel from './label';

interface Props {
  isDone: boolean;
  onToggleCheckbox: () => void;
}

const Task: FC<Props> = ({isDone, onToggleCheckbox}) => {
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
            checked={isDone}
            checkmarkColor={theme.colors.white}
            boxOutlineColor={theme.colors.foreground}
            highlightColor={theme.colors.primary}
          />
        </Touchable>
      </Box>
      <TaskLabel
        strikethrough={isDone}
        inactiveTextColor={theme.colors.secondaryForeground}
        textColor={theme.colors.foreground}>
        Task name
      </TaskLabel>
    </Box>
  );
};
export default Task;
