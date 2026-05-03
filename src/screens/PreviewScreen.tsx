import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Text, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HeaderBar } from '../components/HeaderBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { pickTextFile, copyToClipboard } from '../hooks/useFileOperations';
import { colors, spacing, fontSize } from '../theme/colors';

type RootStackParamList = {
  Home: undefined;
  Editor: undefined;
  Preview: { content: string; fileName: string; isNewFile: boolean };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Preview'>;
type RoutePropType = RouteProp<RootStackParamList, 'Preview'>;

export const PreviewScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  
  const [content, setContent] = useState(route.params?.content || '');
  const [fileName, setFileName] = useState(route.params?.fileName || '');
  const [isLoading, setIsLoading] = useState(false);

  const handlePickFile = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await pickTextFile();
      
      if (result) {
        setContent(result.content);
        setFileName(result.name);
        Alert.alert('Loaded', result.name);
      } else {
        Alert.alert('No file', 'Try again');
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (content) {
      await copyToClipboard(content);
      Alert.alert('Copied');
    }
  }, [content]);

  const handleBack = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleEdit = useCallback(() => {
    navigation.navigate('Editor');
  }, [navigation]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <HeaderBar 
        title={fileName || 'PREVIEW'} 
        showBackButton 
        onBackPress={handleBack}
        rightElement={
          content ? (
            <Pressable onPress={handleCopy}>
              <Text style={styles.copyButton}>COPY</Text>
            </Pressable>
          ) : undefined
        }
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : content ? (
          <Text style={styles.contentText}>{content}</Text>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📄</Text>
            <Text style={styles.emptyText}>NO FILE SELECTED</Text>
            <Text style={styles.emptySubtext}>Tap "Open File" to select a TXT file</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonsContainer}>
        {content ? (
          <PrimaryButton title="EDIT" onPress={handleEdit} style={styles.button} />
        ) : (
          <PrimaryButton title="OPEN FILE" onPress={handlePickFile} style={styles.button} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
  loadingText: { color: colors.white, fontSize: fontSize.body },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
  emptyIcon: { fontSize: 64, marginBottom: spacing.md },
  emptyText: {
    color: colors.white,
    fontSize: fontSize.header,
    fontWeight: '700',
    marginBottom: spacing.sm,
    letterSpacing: 2,
  },
  emptySubtext: { color: colors.greyMedium, fontSize: fontSize.body },
  contentText: {
    color: colors.white,
    fontSize: fontSize.body,
    lineHeight: 26,
    paddingTop: spacing.md,
  },
  copyButton: {
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: '600',
    letterSpacing: 1,
  },
  buttonsContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  button: { marginBottom: spacing.sm },
});