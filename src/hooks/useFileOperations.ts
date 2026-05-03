import * as DocumentPicker from 'expo-document-picker';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { readAsStringAsync, cacheDirectory, writeAsStringAsync, getInfoAsync } from 'expo-file-system/legacy';

export async function pickTextFile(): Promise<{ content: string; name: string } | null> {
  const result = await DocumentPicker.getDocumentAsync({});
  
  if (result.canceled) {
    return null;
  }
  
  let files = result.files || result.assets;
  
  if (!files || files.length === 0) {
    return null;
  }
  
  const file = files[0];
  const name = file.name || 'Untitled.txt';
  
  try {
    const content = await readAsStringAsync(file.uri);
    return { content, name };
  } catch (e) {
    console.log('Read error:', e);
    return null;
  }
}

// Save - keep it super simple (no .txt doubling)
export async function saveTextFile(content: string, fileName: string): Promise<boolean> {
  try {
    // Ensure .txt extension but don't double it
    if (!fileName.endsWith('.txt')) {
      fileName = fileName + '.txt';
    }
    
    const uri = cacheDirectory + fileName;
    console.log('SAVE URI:', uri);
    
    await writeAsStringAsync(uri, content);
    console.log('WRITE DONE');
    
    const info = await getInfoAsync(uri);
    console.log('EXISTS:', info.exists);
    
    return info.exists;
  } catch (e) {
    console.log('SAVE FAILED:', e.message);
    return false;
  }
}

// Share
export async function shareTextFile(content: string, fileName: string): Promise<boolean> {
  try {
    if (!fileName.endsWith('.txt')) {
      fileName = fileName + '.txt';
    }
    
    const uri = cacheDirectory + fileName;
    await writeAsStringAsync(uri, content);
    
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri);
    }
    
    return true;
  } catch (e) {
    console.error('Share error:', e);
    return false;
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  await Clipboard.setStringAsync(text);
}

export const useFileOperations = () => {
  return {
    pickTextFile,
    saveTextFile,
    shareTextFile,
    copyToClipboard,
  };
};