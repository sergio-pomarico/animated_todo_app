import React, {FC, useCallback, useContext} from 'react';
import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {dist, makeImageFromView, vec} from '@shopify/react-native-skia';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import {Box, Text, Touchable} from '../atoms';
import {useTheme} from '../../config/theme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {RootRefContext} from '../../context/overlay-context';
import {setOverlay1, setOverlay2, setTheme} from '../../store/ui';
import {RootState} from '../../types/redux';
import {withTiming} from 'react-native-reanimated';

const wait = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const {width, height} = Dimensions.get('window');

const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

const Drawer: FC<DrawerContentComponentProps> = ({state, navigation}) => {
  const {navigate} = navigation;
  const theme = useTheme();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {ref, circle, transition} = useContext(RootRefContext);
  const {theme: currentTheme} = useSelector((store: RootState) => store.ui);
  const handlerChange = useCallback(
    async (x: number, y: number) => {
      // 0. Define the circle and its maximum radius
      const r = Math.max(...corners.map(corner => dist(corner, {x, y})));
      circle!.value = {x, y, r};

      // 1. Take the screenshot
      const overlay1 = await makeImageFromView(ref!);

      // 2. display it
      dispatch(setOverlay1(overlay1!));

      // 3. switch to dark mode
      await wait(16);
      dispatch(setTheme(currentTheme === 'dark' ? 'light' : 'dark'));

      // 4. wait for the dark mode to render
      await wait(16);

      // 5. take screenshot
      const overlay2 = await makeImageFromView(ref!);
      dispatch(setOverlay2(overlay2!));

      // 6. transition
      transition!.value = 0;
      transition!.value = withTiming(1, {duration: 1000});
      await wait(1000);

      // 7. clean the state
      dispatch(setOverlay1(null));
      dispatch(setOverlay2(null));
    },
    [circle, ref, dispatch, currentTheme, transition],
  );
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(event => {
      handlerChange(event.absoluteX, event.absoluteY);
    });
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
          <GestureDetector gesture={pan}>
            <Icon
              name={currentTheme === 'dark' ? 'sun' : 'moon'}
              size={24}
              color={theme.colors.white}
            />
          </GestureDetector>
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
