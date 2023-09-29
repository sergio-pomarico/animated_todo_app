import React, {FC} from 'react';
import {Box, Text, Touchable} from '../atoms';

interface FloatingAcctionButtonProps {
  onPress: () => void;
}

const FloatingAcctionButton: FC<FloatingAcctionButtonProps> = ({onPress}) => {
  return (
    <Box
      width={64}
      height={64}
      bg="primary"
      borderRadius="xl"
      position="absolute"
      bottom={16}
      right={16}
      justifyContent="center"
      alignItems="center"
      shadowColor="foreground"
      shadowOffset={{width: 0, height: 2}}
      shadowOpacity={0.5}
      shadowRadius={5}
      elevation={5}>
      <Touchable onPress={onPress}>
        <Text color="white" fontSize={32} lineHeight={36}>
          +
        </Text>
      </Touchable>
    </Box>
  );
};

export default FloatingAcctionButton;
