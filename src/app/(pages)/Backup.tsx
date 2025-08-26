import { Button, Text, View } from "@/shared";
import { readFile, saveFile, shareFile } from "@/utils";

export default function Backup() {
  return (
    <View className="flex-1 app">
      <Text>Backup</Text>
      <Button
        onPress={() => {
          readFile();
        }}
      >
        Open
      </Button>
      <Button
        onPress={() => {
          shareFile();
        }}
      >
        Share
      </Button>
      <Button
        onPress={() => {
          saveFile();
        }}
      >
        Download
      </Button>
    </View>
  );
}
