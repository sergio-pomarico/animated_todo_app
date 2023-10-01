import React, {FC, useContext} from 'react';
import {StatusBar as Bar} from 'react-native';

import {ChooseThemeContext} from '../../context/theme-context';
import {useTheme} from '../../config/theme';

const StatusBar: FC = () => {
  const {currentTheme} = useContext(ChooseThemeContext);
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
