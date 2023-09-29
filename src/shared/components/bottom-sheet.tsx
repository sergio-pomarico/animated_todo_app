import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import {useTheme} from '../../config/theme';
import {AnimatedBox, Box} from '../atoms';

interface BottomSheetProps {}

export interface BottomSheetRefProps {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
}

const {height, width} = Dimensions.get('window');

export const MAX_TRANSLATE_Y = -height;

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({}, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const theme = useTheme();
    const context = useSharedValue({y: 0});

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        active.value = destination !== 0;
        translateY.value = withSpring(destination, {damping: 50});
      },
      [translateY, active],
    );
    const isActive = useCallback(() => {
      return active.value;
    }, [active]);
    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);
    const gestureHandler =
      useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: () => {
          context.value = {y: translateY.value};
        },
        onActive: event => {
          translateY.value = event.translationY + context.value.y;
          translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        },
        onEnd: () => {
          if (translateY.value > MAX_TRANSLATE_Y * 0.6) {
            translateY.value = withSpring(0, {damping: 50});
            scrollTo(0);
          } else if (translateY.value < MAX_TRANSLATE_Y * 0.75) {
            scrollTo(MAX_TRANSLATE_Y);
          } else {
            scrollTo(MAX_TRANSLATE_Y * 0.6);
          }
        },
      });
    const style = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [theme.borderRadii.l, 0],
        Extrapolate.CLAMP,
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });
    const backDropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value ? 0.5 : 0),
      };
    });
    const backDropProps = useAnimatedProps(() => {
      return {
        pointerEvents: active.value ? 'auto' : 'none',
      } as any;
    }, []);
    return (
      <>
        <AnimatedBox
          style={[{...StyleSheet.absoluteFillObject}, backDropStyle]}
          backgroundColor="sidebarBackground"
          animatedProps={backDropProps}
          onTouchStart={() => {
            scrollTo(0);
          }}
        />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <AnimatedBox
            style={style}
            height={height}
            backgroundColor="appBarBackground"
            width={width}
            position="absolute"
            top={height}>
            <Box
              width={width / 3}
              height={5}
              backgroundColor="secondaryForeground"
              borderRadius="s"
              alignSelf="center"
              marginVertical="sm"
            />
          </AnimatedBox>
        </PanGestureHandler>
      </>
    );
  },
);

export default BottomSheet;
