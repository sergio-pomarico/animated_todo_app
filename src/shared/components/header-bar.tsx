import React, {FC} from 'react';

import {AnimatedBox, Box, Touchable} from '../atoms';
import {AnimatedBoxProps} from '../atoms/animated-box';

type HeaderBarProps = AnimatedBoxProps & {
  onPress: () => void;
};

const HeaderBar: FC<HeaderBarProps> = ({onPress, style, onLayout}) => {
  return (
    <AnimatedBox
      position="absolute"
      zIndex={2}
      width="100%"
      style={style}
      onLayout={onLayout}>
      <Box
        flexDirection="row"
        alignItems="center"
        mx="m"
        my="m"
        backgroundColor="headerBarBackground"
        p="sm"
        borderRadius="l"
        shadowColor="secondaryForeground"
        shadowOffset={{width: 0, height: 1}}
        shadowOpacity={0.25}
        shadowRadius={4}>
        <Touchable onPress={onPress}>
          <Box width={22} height={18} justifyContent="space-around">
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
