import React, {FC, useCallback, useContext} from 'react';
import {SafeAreaView, Switch} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import {ChooseThemeContext} from '../../context/theme-context';

import Box from '../atoms/box';
import Text from '../atoms/text';
import Touchable from '../atoms/touchable';
import {useTheme} from '../../config/theme';

const Drawer: FC<DrawerContentComponentProps> = ({state, navigation}) => {
  const {navigate} = navigation;
  const theme = useTheme();
  const {currentTheme, setCurrentTheme} = useContext(ChooseThemeContext);
  const handlerChange = useCallback(() => {
    setCurrentTheme!(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, [setCurrentTheme]);
  return (
    <Box flex={1} backgroundColor="sidebarBackground" padding="m">
      <SafeAreaView>
        {state.routeNames.map((route, index) => (
          <Touchable
            onPress={() => navigate(route)}
            key={`${state.routes[index].key}`}>
            <Box margin="sm">
              <Text variant="sidebar" textAlign="left">
                {route}
              </Text>
            </Box>
          </Touchable>
        ))}
        <Box
          alignItems="center"
          flexDirection="row"
          mt="xxl"
          justifyContent="center">
          <Text variant="sidebar" mr="m">
            Light
          </Text>
          <Switch
            value={currentTheme === 'dark'}
            onChange={handlerChange}
            thumbColor={theme.colors.primary}
            trackColor={{
              false: theme.colors.white,
              true: theme.colors.secondaryForeground,
            }}
          />
          <Text variant="sidebar" ml="m">
            Dark
          </Text>
        </Box>
      </SafeAreaView>
    </Box>
  );
};
export default Drawer;
