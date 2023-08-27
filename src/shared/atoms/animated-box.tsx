import {ViewProps} from 'react-native';
import Animated, {AnimateProps} from 'react-native-reanimated';
import {createBox} from '@shopify/restyle';

import {Theme} from '../../config/theme';

export type AnimatedBoxProps = React.ComponentProps<typeof AnimatedBox>;

const AnimatedBox = createBox<Theme, AnimateProps<ViewProps>>(Animated.View);

export default AnimatedBox;
