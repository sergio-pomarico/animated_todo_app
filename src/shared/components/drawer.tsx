import React, {FC, useCallback, useContext} from 'react';
import {StyleSheet, Switch} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import {ChooseThemeContext} from '../../context/theme-context';

import {Box, Text, Touchable} from '../atoms';
import {useTheme} from '../../config/theme';

const Drawer: FC<DrawerContentComponentProps> = ({state, navigation}) => {
  const {navigate} = navigation;
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {currentTheme, setCurrentTheme} = useContext(ChooseThemeContext);
  const handlerChange = useCallback(() => {
    setCurrentTheme!(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, [setCurrentTheme]);
  return (
    <Box
      backgroundColor="sidebarBackground"
      paddingHorizontal="m"
      flex={1}
      style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <Box flex={1}>
        <Text variant="sidebar" fontSize={24} my="l" lineHeight={28}>
          Sergio Pomárico
        </Text>
        {state.routeNames.map((route, index) => (
          <Touchable
            onPress={() => navigate(route)}
            key={`${state.routes[index].key}`}>
            <Box my="sm">
              <Text variant="sidebar" textAlign="left">
                {route}
              </Text>
            </Box>
          </Touchable>
        ))}
      </Box>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        borderTopWidth={StyleSheet.hairlineWidth}
        borderTopColor="sidebarForeground"
        py="m">
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
    </Box>
  );
};
export default Drawer;
