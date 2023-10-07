import React, {FC} from 'react';
import {Text, Touchable} from '../atoms';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({label, onPress}) => {
  return (
    <Touchable
      onPress={onPress}
      height={50}
      width="100%"
      borderRadius="xl"
      backgroundColor="primary"
      justifyContent="center">
      <Text
        color="white"
        fontSize={22}
        lineHeight={24}
        textAlign="center"
        fontWeight="bold">
        {label}
      </Text>
    </Touchable>
  );
};

export default Button;
