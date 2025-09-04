import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export async function readFile() {
  const file = await DocumentPicker.getDocumentAsync();
  const res = await FileSystem.readAsStringAsync(file.assets![0].uri);
  return res;
}
