import { Text, TouchableNativeFeedback, View } from "react-native";

export function TextItem({ item, onPress }: { item: string; onPress: (item: string) => void }) {
  return (
    <TouchableNativeFeedback
      onPress={() => onPress(item)}
      background={TouchableNativeFeedback.Ripple("hsl(0, 0%, 50%)", false, 42)}
    >
      <View className="h-24 aspect-square rounded-full items-center justify-center">
        <Text className="text text-3xl">{item}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
