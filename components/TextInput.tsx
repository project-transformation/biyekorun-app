import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardType
} from 'react-native';

import {Text} from 'react-native-paper'

interface CustomTextInputProps {
  placeholder?: string;
  value?: string;
  keyboardType?: KeyboardType;
  color?: string;
  icon?: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  errorText?: string; // Add errorText prop
  secureTextEntry?: boolean; // Add errorText prop
}

const TextInput = ({
  placeholder,
  icon,
  customStyle,
  inputStyle,
  color,
  onChangeText,
  value,
  keyboardType,
  errorText, // Receive errorText from props
  secureTextEntry
}: CustomTextInputProps) => {

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const borderColor = errorText ? 'red' : isFocused ? color || 'primary' : '#c4c4c4';

  return (
    <>
      <View style={[styles.container, customStyle, { borderBottomColor: borderColor }]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <RNTextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          placeholderTextColor={ errorText ? 'red' :"#ddd"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
        />
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>} 
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: 'black',
  },
  errorText: {
    color: 'red'
  },
});

export default TextInput;
