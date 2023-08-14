import React, {memo, ReactNode, useEffect} from 'react';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import Box from '../../atoms/box';
import Text from '../../atoms/text';
import Touchable from '../../atoms/touchable';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface Props {
  strikethrough: boolean;
  textColor: string;
  inactiveTextColor: string;
  onPress?: () => void;
  children?: ReactNode;
}

const TaskLabel = memo(
  ({strikethrough, textColor, inactiveTextColor, onPress, children}: Props) => {
    const containerOffset = useSharedValue(0);
    const containerAnimatedStyle = useAnimatedStyle(
      () => ({
        transform: [
          {
            translateX: containerOffset.value,
          },
        ],
      }),
      [strikethrough],
    );

    const textColorProgress = useSharedValue(0);
    const textColorAnimatedStyle = useAnimatedStyle(
      () => ({
        color: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor],
        ),
      }),
      [strikethrough, textColor, inactiveTextColor],
    );
    const strikethroughWidth = useSharedValue(0);
    const strikethroughWidthAnimatedStyle = useAnimatedStyle(
      () => ({
        width: `${strikethroughWidth.value * 100}%`,
        borderBottomColor: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor],
        ),
      }),
      [strikethrough, textColor, inactiveTextColor],
    );
    useEffect(() => {
      const easing = Easing.out(Easing.quad);
      if (strikethrough) {
        containerOffset.value = withSequence(
          withTiming(4, {duration: 200, easing}),
          withTiming(0, {duration: 200, easing}),
        );
        textColorProgress.value = withDelay(
          1000,
          withTiming(1, {duration: 400, easing}),
        );
        strikethroughWidth.value = withTiming(1, {duration: 400, easing});
      } else {
        textColorProgress.value = withTiming(0, {duration: 400, easing});
        strikethroughWidth.value = withTiming(0, {duration: 400, easing});
      }
    });
    return (
      <Touchable onPress={onPress}>
        <AnimatedBox position="relative" style={containerAnimatedStyle}>
          <AnimatedText
            fontSize={20}
            numberOfLines={1}
            lineHeight={22}
            style={textColorAnimatedStyle}>
            {children}
          </AnimatedText>
          <AnimatedBox
            position="absolute"
            height={1}
            borderBottomWidth={1}
            top={11}
            style={strikethroughWidthAnimatedStyle}
            width="100%"
          />
        </AnimatedBox>
      </Touchable>
    );
  },
);

export default TaskLabel;
