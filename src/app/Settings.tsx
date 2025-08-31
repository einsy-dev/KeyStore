import { Button, View } from "@/shared";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  return (
    <View className="flex-1 app">
      <View className="flex-1 p-4">
        <Button
          onPress={() => {
            router.push({ pathname: "/", params: { newPin: true as any } });
          }}
        >
          Change Pin
        </Button>
      </View>
    </View>
  );
}
