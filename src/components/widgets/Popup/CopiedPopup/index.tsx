import { View } from "@/components/shared";
import { ClipboardCheck } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Text } from "react-native";

export function CopiedPopup() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="popup_v w-fit mx-auto rounded-2xl flex-row items-center py-2 px-4 gap-2">
      <Text className="popup_t text-3xl text-center">Copied to clipboard.</Text>
      <ClipboardCheck
        color={colorScheme === "light" ? "black" : "white"}
        size={30}
      />
    </View>
  );
}
