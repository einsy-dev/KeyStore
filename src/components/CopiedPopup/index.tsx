import { View } from "@/components/shared/view";
import { ClipboardCheck } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Text } from "react-native";

export function CopiedPopup() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="border item w-fit mx-auto flex-row items-center py-2 px-4 gap-2">
      <Text className="item text-3xl text-center">Copied to clipboard.</Text>
      <ClipboardCheck
        color={colorScheme === "light" ? "black" : "white"}
        size={30}
      />
    </View>
  );
}
