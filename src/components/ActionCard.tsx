import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle, Animated } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  style,
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, damping: 15, stiffness: 400 }).start();
    Animated.timing(opacity, { toValue: 0.75, duration: 100, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 15, stiffness: 400 }).start();
    Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        { transform: [{ scale }], opacity },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondaryBlack,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: colors.tertiaryBlack,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.tertiaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.header,
    fontWeight: '700',
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: colors.greyMedium,
    fontSize: fontSize.caption,
    letterSpacing: 0.3,
  },
});