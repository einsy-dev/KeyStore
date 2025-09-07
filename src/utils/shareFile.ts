import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function shareFile({ filename, data }: { filename: string; data: string }) {
  const fileUri = FileSystem.documentDirectory + `${filename}.txt`;
  await FileSystem.writeAsStringAsync(fileUri, data);
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  }
}
