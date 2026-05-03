import React from 'react';
import { StyleSheet, Text, Pressable, ViewStyle, Animated } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, damping: 15, stiffness: 400 }).start();
      Animated.timing(opacity, { toValue: 0.85, duration: 100, useNativeDriver: true }).start();
    }
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 15, stiffness: 400 }).start();
    Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={[
        styles.button,
        { transform: [{ scale }], opacity },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={styles.pressable}
      >
        <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    height: 56,
    borderRadius: borderRadius.button,
    overflow: 'hidden',
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.button,
    fontWeight: '600',
    letterSpacing: 1,
  },
  textDisabled: {
    color: colors.greyDark,
  },
});