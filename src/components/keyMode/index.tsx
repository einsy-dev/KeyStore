import { SetStateAction } from "react";
import { View } from "../shared";

type KeyModeT = "single" | "double";

export function KeyMode({
  state,
  setState
}: {
  state?: KeyModeT;
  setState?: SetStateAction<KeyModeT>;
}) {
  return (
    <View className="flex-row gap-2">
      <View className="item flex-1 px-2 h-10 p-2">
        <View className="rounded bg-v-50 flex-1" />
      </View>
      <View className="item w-1/2 px-2 h-10 p-2 gap-2 flex-row">
        <View className="rounded bg-v-50 flex-1" />
        <View className="rounded bg-v-50 flex-1" />
      </View>
    </View>
  );
}
