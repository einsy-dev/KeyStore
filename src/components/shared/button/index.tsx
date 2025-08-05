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
      <View className="items-center justify-center btn px-4 py-2 rounded">
        <Text className="btn">{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
