import { useColor } from "@/shared/hooks";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "./Button";

export function GoBack() {
  const router = useRouter();
  const { color } = useColor();
  return (
    <View className="">
      <Button callback={router.canGoBack() ? () => router.back() : undefined}>
        <ChevronLeft color={color} width={30} height={30} />
      </Button>
    </View>
  );
}
