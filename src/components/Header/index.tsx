import { useColor } from "@/hooks/useColor";
import { Check } from "lucide-react-native";
import { Pressable } from "react-native";
import { View } from "../shared";

export function Header({ type }: { type: "submit" | "back" }) {
  const color = useColor();
  return (
    <View className="bg-v-dark flex-row justify-between items-center  px-4">
      <Pressable onPress={() => {}}>
        <View className="p-2">
          <Check color={color} size={30} />
        </View>
      </Pressable>
      <Pressable onPress={() => {}}>
        <View className="p-2">
          <Check color={color} size={30} />
        </View>
      </Pressable>
    </View>
  );
}
