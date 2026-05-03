import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TextInput as RNTextInput, Text, Alert, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HeaderBar } from '../components/HeaderBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { saveTextFile, shareTextFile } from '../hooks/useFileOperations';
import { colors, spacing, fontSize, borderRadius } from '../theme/colors';

type RootStackParamList = {
  Home: undefined;
  Editor: undefined;
  Preview: { content: string; fileName: string; isNewFile: boolean };
};

type EditorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Editor'>;

export const EditorScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<EditorScreenNavigationProp>();
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handlePreview = () => {
    navigation.navigate('Preview', {
      content,
      fileName: fileName || 'Untitled.txt',
      isNewFile: true,
    });
  };

  const handleSave = async () => {
    const name = fileName.trim() || 'Untitled.txt';
    const finalName = name.endsWith('.txt') ? name : name + '.txt';
    
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some text first');
      return;
    }
    
    Alert.alert('Saving...', 'Check Logcat for details');
    
    const success = await shareTextFile(content, finalName);
    const logMsg = 'Check Logcat for SAVE DEBUG logs';
    
    if (success) {
      Alert.alert('Saved!', 'File: ' + finalName);
    } else {
      Alert.alert('Failed', logMsg);
    }
  };

  const handleHelp = () => {
    Alert.alert(
      'How to Save',
      'Tap "SAVE" to save your text to a file. Use the share dialog to save to Downloads or send to another app.',
      [{ text: 'OK' }]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <HeaderBar title="NEW FILE" showBackButton onBackPress={handleBack} />
      
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.fileNameContainer}>
          <RNTextInput
            value={fileName}
            onChangeText={setFileName}
            placeholder="File name (e.g. myfile.txt)"
            placeholderTextColor={colors.greyMedium}
            style={styles.fileNameInput}
          />
        </View>

        <View style={styles.textInputContainer}>
          <RNTextInput
            value={content}
            onChangeText={setContent}
            placeholder="Start typing your text..."
            placeholderTextColor={colors.greyMedium}
            style={styles.textInput}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <PrimaryButton title="PREVIEW" onPress={handlePreview} style={styles.button} />
          <View style={styles.row}>
            <PrimaryButton title="SAVE" onPress={handleSave} style={styles.fullButton} />
            <Pressable onPress={handleHelp} style={styles.helpButton}>
              <Text style={styles.helpText}>?</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  fileNameContainer: {
    marginBottom: spacing.md,
  },
  fileNameInput: {
    backgroundColor: colors.secondaryBlack,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.tertiaryBlack,
    color: colors.white,
    fontSize: fontSize.body,
    padding: spacing.md,
    letterSpacing: 1,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: colors.secondaryBlack,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.tertiaryBlack,
    marginBottom: spacing.md,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontSize: fontSize.body,
    padding: spacing.md,
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    gap: spacing.sm,
  },
  button: {
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  fullButton: {
    flex: 1,
  },
  helpButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.button,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  helpText: {
    color: colors.white,
    fontSize: fontSize.button,
    fontWeight: '600',
  },
});