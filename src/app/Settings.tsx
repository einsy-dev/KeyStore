import { setConfig } from "@/lib/store/config";
import { Button, View } from "@/shared";
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
            router.push({ pathname: "/", params: { newPin: true as any } });
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
      </View>
    </View>
  );
}
