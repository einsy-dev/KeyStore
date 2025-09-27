import { ReactNode } from "react";
import { TouchableNativeFeedback, View } from "react-native";

export function Button({
  children,
  callback,
  className
}: {
  children?: ReactNode;
  callback?: () => void;
  className?: string;
}) {
  if (!callback || typeof callback !== "function" || !children) return null;
  return (
    <TouchableNativeFeedback onPress={callback} background={TouchableNativeFeedback.Ripple("hsl(0,0, 50%)", false, 20)}>
      <View className={`p-2 ${className}`}>{children}</View>
    </TouchableNativeFeedback>
  );
}
