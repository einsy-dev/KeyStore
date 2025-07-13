import * as Clipboard from "expo-clipboard";
import { Text, TouchableOpacity } from "react-native";

export function IntroItem({
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
    <TouchableOpacity onPress={() => copy(value)} className={className}>
      <Text className="px-4 py-1 text-xl">{name}</Text>
    </TouchableOpacity>
  );
}
