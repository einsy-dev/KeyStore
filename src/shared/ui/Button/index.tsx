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
      <View className={`button ${className}`}>
        <Text>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
