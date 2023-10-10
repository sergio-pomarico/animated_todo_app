import React, {FC, ReactNode, RefObject, createContext, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Box} from '../shared/atoms';
import {RootState} from '../store/reducer';
import {Canvas, Image, ImageShader, Circle} from '@shopify/react-native-skia';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

interface OverlayContextProps {
  ref: RefObject<View> | null;
  circle: SharedValue<{x: number; y: number; r: number}> | null;
  transition: SharedValue<number> | null;
}

export const RootRefContext = createContext<OverlayContextProps>({
  ref: null,
  circle: null,
  transition: null,
});

const {width, height} = Dimensions.get('window');

export const mix = (value: number, x: number, y: number) => {
  'worklet';
  return x * (1 - value) + y * value;
};

export const OverlayProvider: FC<{children: ReactNode}> = ({children}) => {
  const ref = useRef<View>(null);
  const circle = useSharedValue({x: 0, y: 0, r: 0});
  const transition = useSharedValue(0);
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });
  const {
    overlay: {image1, image2},
  } = useSelector((store: RootState) => store.ui);
  return (
    <Box flex={1}>
      <Box ref={ref} flex={1} collapsable={false}>
        <RootRefContext.Provider value={{ref, circle, transition}}>
          {children}
        </RootRefContext.Provider>
      </Box>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image image={image1} x={0} y={0} width={width} height={height} />
        {image2 && (
          <Circle cx={circle?.value.x} cy={circle?.value.y} r={r}>
            <ImageShader
              image={image2}
              x={0}
              y={0}
              width={width}
              height={height}
              fit="cover"
            />
          </Circle>
        )}
      </Canvas>
    </Box>
  );
};
