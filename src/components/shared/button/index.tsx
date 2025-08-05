import { TouchableNativeFeedback } from "react-native";
import { Text } from "../text";
import { View } from "../view";
export function Button({
  onPress,
  children
}: {
  onPress: () => void;
  children: string;
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View className="items-center justify-center bg-blue-500 dark:bg-v-red px-4 py-2 rounded">
        <Text className="text-white">{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
