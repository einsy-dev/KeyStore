import * as Clipboard from "expo-clipboard";
import { Text, TouchableHighlight, View } from "react-native";

export function IntroItem({ name, value }: { name: string; value: string }) {
  async function copy(text: string) {
    await Clipboard.setStringAsync(text);
  }
  return (
    <TouchableHighlight onPress={() => copy(value)} className=" pl-4 ">
      <View className="border rounded">
        <Text className="px-4 py-1 text-xl">{name}</Text>
      </View>
    </TouchableHighlight>
  );
}
