import { Numpad } from "@/components/numpad";
import { View } from "@/components/shared";
import { hash } from "@/lib/crypto";
import { selectUser } from "@/lib/store/user";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Circle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Auth() {
  const router = useRouter();
  const [state, setState] = useState("");
  const user = useSelector(selectUser);
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "black" : "white";

  useEffect(() => {
    let timer = null;
    if (state.length >= 4) {
      timer = setTimeout(() => {
        if (authUser(state)) {
          router.navigate("/App");
        }
        setState("");
      }, 0);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [router, state, user]);

  function authUser(pin: string) {
    const storedPin = SecureStore.getItem("pin");

    if (!storedPin) {
      SecureStore.setItem("pin", hash(pin));
      return true;
    } else {
      return storedPin === hash(pin);
    }
  }

  return (
    <View className="app flex-1 p-4 justify-center">
      <View className="flex-1 flex-row gap-8 justify-center items-center">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <View
              key={index}
              className="border rounded aspect-[4/5] h-[60px] items-center justify-center"
            >
              {state.length - 1 >= index && (
                <Circle color={color} fill={color} />
              )}
            </View>
          ))}
      </View>

      <Numpad onChangeText={setState} />
    </View>
  );
}
