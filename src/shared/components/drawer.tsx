import React, {FC, useCallback, useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

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
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text
            variant="sidebar"
            fontSize={24}
            my="l"
            lineHeight={28}
            fontWeight="bold">
            Sergio Pomárico
          </Text>
          <Touchable onPress={handlerChange}>
            <Icon
              name={currentTheme === 'dark' ? 'sun' : 'moon'}
              size={24}
              color={theme.colors.white}
            />
          </Touchable>
        </Box>
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
    </Box>
  );
};
export default Drawer;
