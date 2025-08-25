import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function shareFile() {
  const fileUri = FileSystem.documentDirectory + "myFile.txt";
  const fileContent = "Hello, this is my file content!";
  try {
    await FileSystem.writeAsStringAsync(fileUri, fileContent);
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.log("Sharing is not available on this device.");
    }
  } catch (error) {
    console.error("Error writing or sharing file:", error);
  }
}
