import React from 'react';
import { StyleSheet, View, Text, Animated as RNAnimated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ActionCard } from '../components/ActionCard';
import { colors, spacing, fontSize } from '../theme/colors';

type RootStackParamList = {
  Home: undefined;
  Editor: undefined;
  Preview: { content: string; fileName: string; isNewFile: boolean };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  React.useEffect(() => {
  }, []);

  const handleOpenFile = () => {
    navigation.navigate('Preview', {
      content: '',
      fileName: '',
      isNewFile: false,
    });
  };

  const handleNewFile = () => {
    navigation.navigate('Editor');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.logo}>TXT</Text>
        <Text style={styles.title}>EMPEROR</Text>
      </View>
      <Text style={styles.subtitle}>EXTRACT & GENERATE PLAIN TEXT</Text>

      <View style={styles.cardsContainer}>
        <ActionCard
          title="Open File"
          subtitle="Read existing TXT files"
          icon="📂"
          onPress={handleOpenFile}
          style={styles.card}
        />
        <ActionCard
          title="New File"
          subtitle="Create a new TXT file"
          icon="✏️"
          onPress={handleNewFile}
          style={styles.card}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
    paddingHorizontal: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xs,
  },
  logo: {
    color: colors.white,
    fontSize: 52,
    fontWeight: '300',
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '200',
    letterSpacing: 6,
    marginTop: -spacing.xs,
  },
  subtitle: {
    color: colors.greyMedium,
    fontSize: fontSize.small,
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: spacing.xxl,
    textTransform: 'uppercase',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginBottom: spacing.lg,
  },
});