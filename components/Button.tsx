import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Props {
  text: string;
  width?: any;
  variant?: 'text' | 'outlined' | 'contained';
  customStyle?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
  textColor?: string;
  buttonColor?: string;
  icon?: React.ReactNode; // Pass an icon component
  loading?: boolean; // Show a loading indicator
  disabled?: boolean; // Disable the button
  rounded?: boolean; // Disable the button
}

const Button = ({
  text,
  width,
  variant,
  customStyle,
  onPress,
  textColor,
  buttonColor,
  icon,
  loading,
  disabled,
  rounded
}: Props) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          container: [styles.outlineButtonContainer, { borderColor: buttonColor ,borderRadius:rounded?50:5}],
          text: [styles.outlineButtonText, { color: textColor }],
        };
      case 'text':
        return {
          container: styles.textButtonContainer,
          text: [styles.textButtonText, { color: textColor }],
        };
      default:
        return {
          container: [styles.containedButtonContainer, { backgroundColor: buttonColor ,borderRadius:rounded?50:5}],
          text: [styles.containedButtonText, { color: textColor }],
        };
    }
  };

  const buttonStyles = getButtonStyles();

  const buttonStyle: StyleProp<ViewStyle> = {
    width: width || 'auto',
    opacity: (disabled || loading) ? 0.5 : 1, // Reduce opacity if the button is disabled
    // backgroundColor: loading ? 'gray' : buttonColor, // Gray color when loading
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, styles.touchableRipple]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading} // Disable the button when loading
    >
      <View style={[buttonStyles.container, customStyle, styles.center]}>
        {loading ? (
          <ActivityIndicator color={textColor} /> // Show loading indicator
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={buttonStyles.text}>{text}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Default styles for the contained variant
  containedButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 'auto',
  },
  containedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Styles for the outline variant
  outlineButtonContainer: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderWidth: 1,
    width: 'auto',
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Styles for the text variant
  textButtonContainer: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    width: 'auto',
    
  },
  textButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Ripple effect style
  touchableRipple: {
    borderRadius: 50,
  },
  iconContainer: {
    marginRight: 8, // Adjust as needed
  },
  center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Button;
