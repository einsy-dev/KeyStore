import { Numpad } from "@/components/Numpad";
import { Text, View } from "@/components/shared";
import { hash } from "@/lib/crypto";
import { setUser } from "@/lib/store/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Circle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Auth() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const { newPin = false } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "black" : "white";
  const dispatch = useDispatch();
  useEffect(() => {
    if (input.length >= 4) {
      setTimeout(() => {
        if (newPin && !pass) {
          setPass(input);
          setMessage("New password again");
        } else if (authUser(input, input === pass)) {
          dispatch(setUser({ auth: new Date().toISOString() }));
          router.replace("/App");
          setMessage("");
        } else {
          setMessage("Incorect password");
        }
        setInput("");
      }, 0);
    }
  }, [input, newPin, pass, router, dispatch]);

  return (
    <View className="app flex-1 p-4 justify-center">
      <View className="flex-1 flex-row gap-8 justify-center items-center relative">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <View
              key={index}
              className="border rounded aspect-[4/5] h-[60px] items-center justify-center"
            >
              {input.length - 1 >= index && (
                <Circle color={color} fill={color} />
              )}
            </View>
          ))}
        {message && (
          <Text className="absolute top-80 text-xl !text-v-red">{message}</Text>
        )}
      </View>
      <Numpad onChangeText={setInput} />
    </View>
  );
}

function authUser(pin: string, newPass: boolean = false) {
  const storedPin = SecureStore.getItem("pin");
  if (!storedPin || newPass) {
    SecureStore.setItem("pin", hash(pin));
    return true;
  } else {
    return storedPin === hash(pin);
  }
}
