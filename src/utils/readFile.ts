import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export async function readFile() {
  const file = await DocumentPicker.getDocumentAsync();
  if (file.canceled) return null;
  const res = await FileSystem.readAsStringAsync(file.assets![0].uri);
  return { name: file.assets[0].name, size: file.assets[0].size, value: res };
}
