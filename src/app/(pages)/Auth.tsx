import { Numpad } from "@/components/numpad";
import { View } from "@/components/shared";
import { useRouter } from "expo-router";
import { Circle } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function Auth() {
  const router = useRouter();
  const [state, setState] = useState("");

  useEffect(() => {
    if (state.length >= 4) {
      router.navigate("/(pages)/App");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
                <Circle color={"white"} fill={"white"} />
              )}
            </View>
          ))}
      </View>

      <Numpad value={state} onChangeText={(state) => setState(state)} />
    </View>
  );
}
