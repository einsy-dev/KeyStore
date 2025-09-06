import { Text, TouchableNativeFeedback, View } from "react-native";

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
        <Text className="text">{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
