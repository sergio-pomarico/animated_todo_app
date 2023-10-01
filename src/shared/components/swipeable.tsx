import React, {FC, ReactNode} from 'react';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import {
  Context,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

import AnimatedBox from '../atoms/animated-box';
import {Box} from '../atoms';
import {Dimensions, StyleSheet} from 'react-native';

interface SwipeableProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: ReactNode;
  height?: number;
  onDelete: () => void;
}

const {width} = Dimensions.get('screen');
const TRANSLATE_X_THRESHOLD = -width * 0.3;

const Swipeable: FC<SwipeableProps> = ({
  children,
  height,
  onDelete,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const itemHeigh = useSharedValue(height);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onActive: event => {
      translateX.value = Math.max(-120, Math.min(0, event.translationX));
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        itemHeigh.value = withTiming(
          0,
          {
            duration: 250,
          },
          () => {
            runOnJS(onDelete)();
          },
        );
      } else {
        translateX.value = withTiming(0);
      }
    },
  });
  const style = useAnimatedStyle(() => ({
    height: itemHeigh.value,
    transform: [{translateX: translateX.value}],
  }));
  const deleteStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < 0 ? 1 : 0,
    };
  });
  return (
    <Box>
      <AnimatedBox
        style={[StyleSheet.absoluteFillObject, deleteStyle]}
        backgroundColor="red">
        <Box
          alignItems="flex-end"
          justifyContent="center"
          height={height}
          pr="xl">
          <Icon color="white" size={24} name="trash" />
        </Box>
      </AnimatedBox>
      <PanGestureHandler
        activeOffsetX={[-10, 10]}
        onGestureEvent={gestureHandler}
        simultaneousHandlers={simultaneousHandlers}>
        <AnimatedBox style={style}>{children}</AnimatedBox>
      </PanGestureHandler>
    </Box>
  );
};
export default Swipeable;
