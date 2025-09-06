import { useColor } from "@/hooks/useColor";

import { Delete, Fingerprint } from "lucide-react-native";
import { memo } from "react";
import { View } from "react-native";
import { IconItem } from "./IconItem";
import { NumpadLine } from "./Line";
import { TextItem } from "./TextItem";

export const Numpad = memo(function Numpad({
  onChangeText = () => {},
  onFingerPrint = () => {},
  disabled = false
}: {
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onFingerPrint: () => void;
  disabled?: boolean;
}) {
  const color = useColor();

  function handlePress(item: string | number) {
    if (disabled) return;
    onChangeText((prev: string) => {
      if (+item >= 0) {
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
        <IconItem item={<Fingerprint color={color.iconColor} height={40} width={40} />} onPress={onFingerPrint} />
        <TextItem item={"0"} onPress={() => handlePress(0)} />
        <IconItem item={<Delete color={color.iconColor} />} onPress={() => handlePress(-1)} />
      </View>
    </View>
  );
});
