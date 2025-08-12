import { Numpad } from "@/components/numpad";
import { View } from "@/components/shared";
import { useRouter } from "expo-router";
import { Circle } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TextInput as RNTextInput,
  TouchableNativeFeedback
} from "react-native";

export default function Auth() {
  const router = useRouter();
  const [state, setState] = useState(Array(4).fill(""));
  const ref = useRef<RNTextInput>(null);

  useEffect(() => {
    if (!state[3]) return;
    setState(Array(4).fill(""));
    router.navigate("/(pages)/App");
  }, [state, router]);

  useEffect(() => {
    const inputFocus = Keyboard.addListener("keyboardDidHide", () => {
      ref.current?.blur();
    });
    return () => {
      inputFocus.remove();
    };
  }, []);

  return (
    <View className="app flex-1 p-4">
      <KeyboardAvoidingView
        behavior="padding"
        className=" justify-center flex-1"
      >
        <TouchableNativeFeedback onPress={() => ref.current?.focus()}>
          <View className="flex-row gap-8 justify-center items-center">
            {state.map((el, index) => (
              <View
                key={index}
                className="border rounded aspect-[4/5] h-[60px] items-center justify-center"
              >
                {el && <Circle color={"white"} fill={"white"} />}
              </View>
            ))}
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>

      <Numpad
        value={state.join("")}
        onChangeText={(text: string) => setState(handletext(text))}
      />
    </View>
  );
}

function handletext(text: string) {
  const textArr = text.split("");
  return Array.from({ length: 4 }, (_, index) => textArr[index] || "");
}
