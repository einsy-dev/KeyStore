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
      <View className={`button items-center justify-center px-4 py-2 rounded ${className}`}>
        <Text className="button_text">{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
