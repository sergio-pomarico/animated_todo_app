import React, {FC} from 'react';

import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Box from '../atoms/box';
import Text from '../atoms/text';

const Drawer: FC<DrawerContentComponentProps> = () => {
  return (
    <Box flex={1} backgroundColor="sidebarBackground" padding="m">
      <Text color="sidebarForeround">Menu</Text>
    </Box>
  );
};
export default Drawer;
