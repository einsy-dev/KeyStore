import { View } from "react-native";
import { TextItem } from "../TextItem";

export function NumpadLine({ items, handlePress }: { items: string[]; handlePress: (item: string) => void }) {
  return (
    <View className=" flex-row justify-between">
      {items.map((el: string) => (
        <TextItem key={el} item={el} onPress={() => handlePress(el)} />
      ))}
    </View>
  );
}
