import React, {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';

import {Box, Text, Touchable, AnimatedBox} from '../../atoms';
import {useTheme} from '../../../config/theme';
import {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface DateTimePickerProps {
  label: string;
  type: 'date' | 'time';
}

const DateTimePicker = ({label, type}: DateTimePickerProps) => {
  const theme = useTheme();
  const now = new Date();
  const [date, setDate] = useState<Date>(now);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const {height: datePickerHeight} = event.nativeEvent.layout;
    setHeight(datePickerHeight);
  };
  const style = useAnimatedStyle(() => {
    return {
      height: visible ? withSpring(height + 24) : withTiming(0),
    };
  });
  return (
    <Box>
      <Box
        flexDirection="row"
        marginBottom="m"
        justifyContent="space-between"
        alignItems="center">
        <Text fontWeight="bold" fontSize={20} lineHeight={24}>
          {label}
        </Text>
        <Touchable onPress={() => setVisible(prev => !prev)}>
          <Box
            backgroundColor="background"
            borderRadius="m"
            paddingHorizontal="l"
            paddingVertical="sm">
            <Text
              fontSize={18}
              lineHeight={20}
              textAlign="center"
              color="foreground">
              {type === 'date'
                ? date.toLocaleDateString()
                : date.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
            </Text>
          </Box>
        </Touchable>
      </Box>
      <AnimatedBox mb="l" style={style} overflow="hidden">
        <Box alignItems="flex-end">
          <Touchable onPress={() => setVisible(prev => !prev)}>
            <Icon size={24} name="check" color={theme.colors.primary} />
          </Touchable>
        </Box>
        <Box alignSelf="center">
          <DatePicker
            date={date}
            mode={type}
            textColor={theme.colors.foreground}
            fadeToColor="none"
            onDateChange={newDate => setDate(newDate)}
            onLayout={onLayout}
          />
        </Box>
      </AnimatedBox>
    </Box>
  );
};

export default DateTimePicker;
