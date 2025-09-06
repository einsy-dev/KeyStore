import { useColor } from "@/hooks";
import { Button } from "@/shared/ui";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Settings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const color = useColor();
  return (
    <View className="flex-1 app">
      <View className="flex-1 p-4 gap-4">
        <Button
          onPress={() => {
            router.push({
              pathname: "/sign-in",
              params: { newPin: true as any }
            });
          }}
        >
          Change Pin
        </Button>
        <Button
          onPress={() => {
            // dispatch(setConfig({ theme: color.statusBarColor }));
          }}
        >
          Change Theme
        </Button>
        <View>
          <Text className="text text-center">{process.env.EXPO_PUBLIC_SECRET || "no env"}</Text>
        </View>
      </View>
    </View>
  );
}
