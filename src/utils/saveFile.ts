import * as FileSystem from "expo-file-system";

export async function saveFile({
  filename,
  data
}: {
  filename: string;
  data: string;
}) {
  const permission =
    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permission.granted) return;
  const file = await FileSystem.StorageAccessFramework.createFileAsync(
    permission.directoryUri,
    filename,
    "text/plain"
  );
  await FileSystem.writeAsStringAsync(file, data);
}
