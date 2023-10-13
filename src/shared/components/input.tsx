import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import React, {forwardRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {Theme, makeStyle, useTheme} from '../../config/theme';

import {Box, Text, Touchable} from '../atoms';

interface InputProps extends TextInputProps {
  placeholder: string;
  onChanceText: (text: string) => void;
  icon?: string;
  error: string | undefined;
  touched: boolean | undefined;
  label: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({onChanceText, label, icon, ...props}, ref) => {
    const {value = '', touched, error, secureTextEntry} = props;

    const [text, setText] = useState<string>(value);
    const [hideText, setHideText] = useState<boolean | undefined>(
      secureTextEntry,
    );
    const onChange = (input: string) => {
      setText(input);
      onChanceText(input);
    };
    const theme = useTheme();
    const styles = useStyles();
    return (
      <Box justifyContent="flex-start" marginBottom="m">
        <Box
          borderBottomWidth={StyleSheet.hairlineWidth}
          borderBottomColor={
            !touched ? 'foreground' : !error ? 'primary' : 'red'
          }
          alignItems="flex-start"
          width="100%"
          paddingBottom="sm"
          marginBottom="xs">
          <Box
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="flex-end"
            marginBottom="sm">
            {icon && (
              <Icon
                name={icon}
                size={theme.spacing.m}
                color={theme.colors.secondaryForeground}
              />
            )}
            <Text color="foreground" fontWeight="bold" fontSize={18}>
              {label}
            </Text>
          </Box>
          <Box flexDirection="row">
            <TextInput
              ref={ref}
              underlineColorAndroid="transparent"
              {...props}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={onChange}
              secureTextEntry={hideText}
              placeholderTextColor={theme.colors.secondaryForeground}
              value={text}
            />
            {secureTextEntry && (
              <Touchable onPress={() => setHideText(prev => !prev)}>
                <Icon
                  name={hideText ? 'show' : 'hide'}
                  size={theme.spacing.m}
                  color={theme.colors.primary}
                />
              </Touchable>
            )}
          </Box>
        </Box>
        {error !== undefined && touched && <Text color="red">{error}</Text>}
      </Box>
    );
  },
);

const useStyles = makeStyle((theme: Theme) => ({
  input: {
    flex: 1,
    color: theme.colors.foreground,
    fontSize: theme.spacing.m,
  },
}));

export default Input;
