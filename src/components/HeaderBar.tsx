import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize } from '../theme/colors';

interface HeaderBarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightElement,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.content}>
        {showBackButton ? (
          <Pressable onPress={onBackPress} hitSlop={8} style={styles.backButton}>
            <Text style={styles.backIcon}>{'<'}</Text>
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {rightElement ? (
          <View style={styles.rightContainer}>{rightElement}</View>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '300',
  },
  title: {
    flex: 1,
    color: colors.white,
    fontSize: fontSize.header,
    fontWeight: '600',
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
  },
  placeholder: {
    width: 40,
  },
});