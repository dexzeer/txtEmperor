import React, { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, View, Text, ViewStyle } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  multiline = true,
  numberOfLines = 10,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.greyMedium}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          multiline && { minHeight: numberOfLines * 24 },
        ]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBlack,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.tertiaryBlack,
  },
  input: {
    color: colors.white,
    fontSize: fontSize.body,
    padding: spacing.md,
    minHeight: 120,
  },
  inputFocused: {
    borderColor: colors.white,
  },
});