import * as Clipboard from "expo-clipboard";
import { Text, TouchableOpacity } from "react-native";

export function Item({
  name,
  value,
  className = ""
}: {
  name: string;
  value: string;
  className?: string;
}) {
  async function copy(text: string) {
    await Clipboard.setStringAsync(text);
  }
  return (
    <TouchableOpacity onPress={() => copy(value)}>
      <Text className={"px-4 py-1 text-3xl border rounded mb-1" + className}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
