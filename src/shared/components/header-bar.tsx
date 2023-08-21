import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AnimatedBox, Box, Touchable} from '../atoms';

interface HeaderBarProps {
  onPress: () => void;
}

const HeaderBar: FC<HeaderBarProps> = ({onPress}) => {
  const insets = useSafeAreaInsets();
  return (
    <AnimatedBox
      position="absolute"
      top={insets.top + 10}
      left={0}
      right={0}
      zIndex={2}>
      <Box
        flexDirection="row"
        alignItems="center"
        mx="m"
        my="m"
        backgroundColor="headerBarBackground"
        p="sm"
        borderRadius="l"
        minHeight={44}>
        <Touchable onPress={onPress}>
          <Box width={22} height={22} justifyContent="space-around">
            <Box height={2} backgroundColor="foreground" width="100%" />
            <Box height={2} backgroundColor="foreground" width="100%" />
            <Box height={2} backgroundColor="foreground" width="100%" />
          </Box>
        </Touchable>
      </Box>
    </AnimatedBox>
  );
};

export default HeaderBar;
