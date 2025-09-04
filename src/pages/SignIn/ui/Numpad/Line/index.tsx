import { View } from "@/shared/ui";
import { TextItem } from "../TextItem";

export function NumpadLine({ items, handlePress }: { items: string[]; handlePress: (item: string | number) => void }) {
  return (
    <View className=" flex-row justify-between">
      {items.map((el: string) => (
        <TextItem key={el} item={el} onPress={() => handlePress(el)} />
      ))}
    </View>
  );
}
