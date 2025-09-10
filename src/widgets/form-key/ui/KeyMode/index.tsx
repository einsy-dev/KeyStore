import { SlideDecorator } from "@/shared/decorators";
import { Dispatch, SetStateAction } from "react";
import { TouchableNativeFeedback, View } from "react-native";

export function KeyMode({ state, setState }: { state: KeyModeT; setState: Dispatch<SetStateAction<KeyModeT>> }) {
  return (
    <View className="gap-1">
      <View className="flex-row gap-2">
        <TouchableNativeFeedback onPress={() => setState("single")}>
          <View className="card flex-1 px-2 h-10 p-2 rounded-lg">
            <View className="rounded app flex-1 border" />
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => setState("double")}>
          <View className="card flex-1 h-10 gap-2 flex-row rounded-lg p-2">
            <View className="rounded app flex-1 border" />
            <View className="rounded app flex-1 border" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <SlideDecorator active={state === "double"} config={{ startX: 4, endX: 199 }}>
        <View className="button w-[180px] h-1 rounded-full"></View>
      </SlideDecorator>
    </View>
  );
}
