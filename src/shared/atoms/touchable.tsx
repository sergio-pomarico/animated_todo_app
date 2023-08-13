import React from 'react';
import {
  TouchableOpacity as NativeTouchable,
  TouchableOpacityProps as NativeTouchableProps,
} from 'react-native';
import {Theme} from '../../config/theme';
import {createBox} from '@shopify/restyle';

const Touchable = createBox<Theme, NativeTouchableProps>(NativeTouchable);
export type PressableProps = React.ComponentProps<typeof Touchable>;

export default Touchable;
