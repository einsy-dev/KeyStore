import * as FileSystem from "expo-file-system";

export async function saveFile() {
  const fileContent = "Hello, this is my file content!";
  try {
    const permission =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permission.granted) return;
    const file = await FileSystem.StorageAccessFramework.createFileAsync(
      permission.directoryUri,
      "text",
      "text/plain"
    );
    await FileSystem.writeAsStringAsync(file, fileContent);
  } catch (e) {
    console.error(e);
  }
}
