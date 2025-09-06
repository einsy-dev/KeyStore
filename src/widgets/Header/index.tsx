import { useColor } from "@/hooks/useColor";
import { useRouter } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function Header() {
  const color = useColor();
  const router = useRouter();
  return (
    <View className="bg-v-dark flex-row justify-between items-center px-4">
      <Pressable onPress={() => router.back()}>
        <View className="p-2">
          <ChevronLeft color={color.iconColor} size={30} />
        </View>
      </Pressable>
      <Pressable>
        <View className="p-2">
          <Check color={color.iconColor} size={30} />
        </View>
      </Pressable>
    </View>
  );
}
