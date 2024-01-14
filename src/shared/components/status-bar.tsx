import React, {FC} from 'react';
import {StatusBar as Bar} from 'react-native';

import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../types/redux';

const StatusBar: FC = () => {
  const {theme: currentTheme} = useSelector((state: RootState) => state.ui);
  const theme = useTheme();
  const isDark = currentTheme === 'dark';
  return (
    <Bar
      barStyle={isDark ? 'light-content' : 'dark-content'}
      backgroundColor={theme.colors.appBarBackground}
    />
  );
};

export default StatusBar;
