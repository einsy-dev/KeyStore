import { Button, View } from "@/shared";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  return (
    <View className="flex-1 app">
      <Button
        onPress={() => {
          router.push({ pathname: "/", params: { newPin: true as any } });
        }}
      >
        Change Pin
      </Button>
    </View>
  );
}
