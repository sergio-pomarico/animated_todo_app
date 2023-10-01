import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Box, Touchable} from '../atoms';

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
        <Icon color="white" size={24} name="plus" />
      </Touchable>
    </Box>
  );
};

export default FloatingAcctionButton;
