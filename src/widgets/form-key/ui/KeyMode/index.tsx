import { Dispatch, SetStateAction } from "react";
import { TouchableNativeFeedback, View } from "react-native";

export function KeyMode({ state, setState }: { state: KeyModeT; setState: Dispatch<SetStateAction<KeyModeT>> }) {
  return (
    <View className="flex-row gap-2">
      <TouchableNativeFeedback onPress={() => setState("single")}>
        <View className={`flex-1 px-2 h-10 p-2 bg-v-dark rounded-lg ${state === "single" ? "border" : ""}`}>
          <View className="rounded bg-v-50 flex-1" />
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={() => setState("double")}>
        <View
          className={`w-1/2 px-2 h-10 p-2 gap-2 flex-row bg-v-dark rounded-lg ${state === "double" ? "border" : ""}`}
        >
          <View className="rounded bg-v-50 flex-1" />
          <View className="rounded bg-v-50 flex-1" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
