import React, {FC} from 'react';

import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Box from '../atoms/box';
import Text from '../atoms/text';
import Touchable from '../atoms/touchable';
import {SafeAreaView} from 'react-native';

const Drawer: FC<DrawerContentComponentProps> = ({state, navigation}) => {
  const {navigate} = navigation;
  return (
    <Box flex={1} backgroundColor="sidebarBackground" padding="m">
      <SafeAreaView>
        <Box marginBottom="xxl">
          {state.routeNames.map((route, index) => (
            <Touchable
              onPress={() => navigate(route)}
              key={`${state.routes[index].key}`}>
              <Box margin="sm">
                <Text variant="sidebar">{route}</Text>
              </Box>
            </Touchable>
          ))}
        </Box>
      </SafeAreaView>
    </Box>
  );
};
export default Drawer;
