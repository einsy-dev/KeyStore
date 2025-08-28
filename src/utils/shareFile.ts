import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function shareFile({
  filename,
  data
}: {
  filename: string;
  data: string;
}) {
  const fileUri = FileSystem.documentDirectory + `${filename}.txt`;
  try {
    await FileSystem.writeAsStringAsync(fileUri, data);
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.log("Sharing is not available on this device.");
    }
  } catch (error) {
    console.error("Error writing or sharing file:", error);
  }
}
