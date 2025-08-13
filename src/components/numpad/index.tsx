import { Delete } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo, ReactNode } from "react";
import { Pressable } from "react-native";
import { Text, View } from "../shared";

export const Numpad = memo(function Numpad({
  onChangeText = () => ""
}: {
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "black" : "white";

  console.log("render");

  function handlePress(item: string | number) {
    onChangeText((prev: string) => {
      if (typeof item === "string") {
        return (prev += item);
      } else {
        return prev.slice(0, prev.length - 1);
      }
    });
  }

  return (
    <View className="w-3/4 mx-auto">
      <NumpadLine items={["1", "2", "3"]} handlePress={handlePress} />
      <NumpadLine items={["4", "5", "6"]} handlePress={handlePress} />
      <NumpadLine items={["7", "8", "9"]} handlePress={handlePress} />
      <NumpadLine
        items={["", "0", <Delete key={"Delete"} color={color} />]}
        handlePress={handlePress}
      />
    </View>
  );
});

function NumpadLine({
  items,
  handlePress
}: {
  items: string[] | ReactNode[];
  handlePress: (item: string | number) => void;
}) {
  return (
    <View className=" flex-row justify-between">
      {items.map((el) =>
        typeof el == "string" ? ( //only one "react Node"
          <TextItem key={el} item={el} onPress={() => handlePress(el)} />
        ) : (
          <IconItem key={"delete"} item={el} onPress={() => handlePress(-1)} />
        )
      )}
    </View>
  );
}

function TextItem({
  item,
  onPress
}: {
  item: string;
  onPress: (item: string) => void;
}) {
  return (
    <Pressable onPress={() => onPress(item)}>
      <View className=" h-24 aspect-square rounded-full items-center justify-center">
        <Text className="text-3xl">{item}</Text>
      </View>
    </Pressable>
  );
}

function IconItem({ item, onPress }: { item: ReactNode; onPress: () => void }) {
  return (
    <Pressable onPress={() => onPress()}>
      <View className=" h-24 aspect-square rounded-full items-center justify-center">
        {item}
      </View>
    </Pressable>
  );
}
