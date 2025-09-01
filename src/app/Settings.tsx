import store from "@/lib/store";
import { setConfig } from "@/lib/store/config";
import { Button, Text, View } from "@/shared";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useDispatch } from "react-redux";

export default function Settings() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();

  return (
    <View className="flex-1 app">
      <View className="flex-1 p-4 gap-4">
        <Button
          onPress={() => {
            router.push({ pathname: "/Auth", params: { newPin: true as any } });
          }}
        >
          Change Pin
        </Button>
        <Button
          onPress={() => {
            dispatch(
              setConfig({ theme: colorScheme === "light" ? "dark" : "light" })
            );
          }}
        >
          Change Theme
        </Button>
        <View>
          <Text className="text-center">
            {process.env.EXPO_PUBLIC_SECRET || "no env"}
          </Text>
          <Text className="text-center">
            {JSON.stringify(store.getState())}
          </Text>
        </View>
      </View>
    </View>
  );
}
