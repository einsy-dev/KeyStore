import { DotBox } from "@/components/DotBox";
import { Numpad } from "@/components/Numpad";
import { Text, View } from "@/components/shared";
import { useAuth } from "@/hooks/useAuth";
import { useBioAuth } from "@/hooks/useAuthBio";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Auth() {
  const router = useRouter();
  // const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const { newPin = false } = useLocalSearchParams();

  const bioStatus = useBioAuth();
  const { value, setValue, status } = useAuth("", newPin as boolean);

  useEffect(() => {
    if (bioStatus === "success" || status === "success")
      setTimeout(() => {
        router.replace("/App");
      }, 0);
  }, [status, router, bioStatus, setValue]);

  return (
    <View className="app flex-1 p-4 justify-center">
      <View className="flex-1 flex-row gap-8 justify-center items-center relative">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <DotBox
              key={index}
              value={value[index] || bioStatus === "success" ? "S" : ""}
              status={bioStatus === "success" ? bioStatus : status}
            />
          ))}
        {message && (
          <Text className="absolute top-80 text-xl !text-v-red">{message}</Text>
        )}
      </View>
      <Numpad onChangeText={setValue as any} />
    </View>
  );
}
