import { selectHeader } from "@/lib/store/app";
import { useColor } from "@/shared/hooks/useColor";
import { View } from "@/shared/ui";
import { Check } from "lucide-react-native";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";

export function Header() {
  const color = useColor();
  const header = useSelector(selectHeader);

  return (
    <View className="bg-v-dark flex-row justify-between items-center  px-4">
      <Pressable onPress={() => {}}>
        <View className="p-2">
          <Check color={color.iconColor} size={30} />
        </View>
      </Pressable>
      <Pressable onPress={() => {}}>
        <View className="p-2">
          <Check color={color.iconColor} size={30} />
        </View>
      </Pressable>
    </View>
  );
}
