import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {AnimatedBox, AnimatedText} from '../atoms';
import {useTheme} from '../../config/theme';
import {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ToastRefProps {
  show: () => void;
}

const ToastColors = {
  [ToastType.SUCCESS]: '#1f8503',
  [ToastType.ERROR]: '#f00a1d',
  [ToastType.INFO]: '#0077ed',
};

const ToastIcon = {
  [ToastType.SUCCESS]: 'check-circle',
  [ToastType.ERROR]: 'x-circle',
  [ToastType.INFO]: 'alert-circle',
};

const Toast = forwardRef<ToastRefProps, ToastProps>(
  ({message, type, duration}: ToastProps, ref) => {
    const [height, setHeight] = useState(0);
    const [textLength, setTextLength] = useState(0);

    const [visible, setVisible] = useState(false);
    const timer = useRef<NodeJS.Timeout | null>(null);

    const transY = useSharedValue(0);
    const transX = useSharedValue(0);

    const theme = useTheme();

    const handleToastLayout = (event: LayoutChangeEvent) => {
      if (height !== event.nativeEvent.layout.height) {
        setHeight(event.nativeEvent.layout.height);
      }
    };

    const handleTextLayout = (event: LayoutChangeEvent) => {
      if (textLength !== event.nativeEvent.layout.width) {
        setTextLength(Math.floor(event.nativeEvent.layout.width));
      }
    };

    const show = useCallback(() => {
      setVisible(true);
    }, []);

    useImperativeHandle(ref, () => ({show}), [show]);

    useEffect(() => {
      if (height > 0) {
        transY.value = -height;
      }
    }, [height, transY]);

    useEffect(() => {
      if (textLength > 0) {
        transX.value = textLength + 2 * theme.spacing.xs;
      }
    }, [textLength, transX, theme.spacing.xs]);

    const showToast = useCallback(() => {
      transY.value = withTiming(height + theme.spacing.xl, {
        duration: duration,
      });
      transX.value = withDelay(duration!, withTiming(0, {duration: duration}));
    }, [transY, transX, height, theme.spacing.xl, duration]);

    const hideToast = useCallback(() => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      transY.value = withDelay(
        duration!,
        withTiming(-height, {
          duration: duration,
          easing: Easing.bezierFn(0.36, 0, 0.66, -0.56),
        }),
      );
    }, [duration, height, transY]);

    useEffect(() => {
      if (visible) {
        showToast();
        timer.current = setTimeout(() => {
          setVisible(false);
        }, 4000);
      } else {
        hideToast();
      }

      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, [visible, showToast, hideToast, transX, textLength, theme.spacing.xs]);

    const boxStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: transY.value}],
        opacity: interpolate(
          transY.value,
          [-height, height + theme.spacing.xl],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      };
    }, [height]);

    const outerBoxStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: -Math.max(transX.value, 1) / 2}],
      };
    }, []);

    const innerBoxStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: transX.value}],
      };
    }, []);

    const textStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(transX.value, [0, textLength], [1, 0]),
      };
    }, [textLength]);

    return (
      <AnimatedBox
        top={0}
        position="absolute"
        zIndex={20}
        opacity={1}
        alignSelf="center"
        onLayout={handleToastLayout}
        style={[boxStyle]}>
        <AnimatedBox overflow="hidden" borderRadius="xl" style={outerBoxStyle}>
          <AnimatedBox
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            p="xs"
            borderRadius="xl"
            overflow="hidden"
            style={[innerBoxStyle, {backgroundColor: ToastColors[type]}]}>
            <Icon name={ToastIcon[type]} size={20} color="white" />
            <AnimatedText
              color="white"
              textAlign="left"
              marginHorizontal="xs"
              onLayout={handleTextLayout}
              style={textStyle}>
              {message}
            </AnimatedText>
          </AnimatedBox>
        </AnimatedBox>
      </AnimatedBox>
    );
  },
);

export default Toast;
