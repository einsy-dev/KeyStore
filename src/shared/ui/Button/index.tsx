import { TouchableNativeFeedback } from "react-native";
import { Text } from "../Text";
import { View } from "../View";
export function Button({
  onPress,
  className = "",
  children
}: {
  onPress?: () => void;
  className?: string;
  children?: string;
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        className={`items-center justify-center bg-blue-500 dark:bg-v-red px-4 py-2 rounded ${className}`}
      >
        <Text className="text-white">{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
