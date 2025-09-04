import { View } from "@/shared/ui";
import { ReactNode } from "react";
import { TouchableNativeFeedback } from "react-native";

export function IconItem({ item, onPress }: { item: ReactNode; onPress: () => void }) {
  return (
    <TouchableNativeFeedback
      onPress={() => onPress()}
      background={TouchableNativeFeedback.Ripple("hsl(0, 0%, 50%)", false, 42)}
    >
      <View className=" h-24 aspect-square rounded-full items-center justify-center">{item}</View>
    </TouchableNativeFeedback>
  );
}
