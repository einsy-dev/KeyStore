import { Button, Toggle } from "@/shared/ui";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  const router = useRouter();

  return (
    <View className="flex-1 app p-4 gap-4">
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/sign-in",
            params: { newPin: true as any }
          });
        }}
      >
        <Text className="text text-xl py-2">Change Pin</Text>
      </Pressable>
      <Button
        onPress={() => {
          // dispatch(setConfig({ theme: color.statusBarColor }));
        }}
      >
        Change Theme
      </Button>
      <Toggle />
      <View>
        <Text className="text text-center">{process.env.EXPO_PUBLIC_SECRET || "no env"}</Text>
      </View>
    </View>
  );
}
