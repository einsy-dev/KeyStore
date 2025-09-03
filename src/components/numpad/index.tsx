import { Delete, Fingerprint } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo, ReactNode } from "react";
import { TouchableNativeFeedback } from "react-native";
import { Text, View } from "../shared";

export const Numpad = memo(function Numpad({
  onChangeText = () => {},
  onFingerPrint = () => {},
  status
}: {
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onFingerPrint: () => void;
  status: AuthStatusI;
}) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "black" : "white";

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

      <View className=" flex-row justify-between">
        {status.isBioAvailbale ? (
          <IconItem
            item={<Fingerprint color={color} height={40} width={40} />}
            onPress={onFingerPrint}
          />
        ) : (
          <TextItem item={""} onPress={() => null} />
        )}
        <TextItem item={"0"} onPress={() => handlePress(0)} />
        <IconItem
          item={<Delete color={color} />}
          onPress={() => handlePress(-1)}
        />
      </View>
    </View>
  );
});

function NumpadLine({
  items,
  handlePress
}: {
  items: string[];
  handlePress: (item: string | number) => void;
}) {
  return (
    <View className=" flex-row justify-between">
      {items.map((el: string) => (
        <TextItem key={el} item={el} onPress={() => handlePress(el)} />
      ))}
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
    <TouchableNativeFeedback
      onPress={() => onPress(item)}
      background={TouchableNativeFeedback.Ripple("hsl(0, 0%, 50%)", false, 42)}
    >
      <View className=" h-24 aspect-square rounded-full items-center justify-center">
        <Text className="text-3xl">{item}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function IconItem({ item, onPress }: { item: ReactNode; onPress: () => void }) {
  return (
    <TouchableNativeFeedback
      onPress={() => onPress()}
      background={TouchableNativeFeedback.Ripple("hsl(0, 0%, 50%)", false, 42)}
    >
      <View className=" h-24 aspect-square rounded-full items-center justify-center">
        {item}
      </View>
    </TouchableNativeFeedback>
  );
}
