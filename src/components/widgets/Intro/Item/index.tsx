import * as Clipboard from "expo-clipboard";
import { Text, TouchableOpacity } from "react-native";

export function Item({
  data,
  className = ""
}: {
  data: KeyI;
  className?: string;
}) {
  async function copy(text: string) {
    await Clipboard.setStringAsync(text);
  }
  console.log("key", data);
  return (
    <TouchableOpacity onPress={() => copy(data.value)}>
      <Text className={"px-4 py-1 text-3xl border rounded mb-1" + className}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
}
