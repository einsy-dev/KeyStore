import { Toggle } from "@/shared/ui";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  const { colorScheme, setColorScheme } = useColorScheme();
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

      <View className="flex-row justify-between items-center">
        <Text className="text text-xl">Change Theme</Text>
        <Toggle
          active={colorScheme === "light"}
          setActive={(isActive) => {
            setColorScheme(isActive ? "light" : "dark");
          }}
        />
      </View>
      <View>
        <Text className="text text-center">{process.env.EXPO_PUBLIC_SECRET || "no env"}</Text>
      </View>
    </View>
  );
}
