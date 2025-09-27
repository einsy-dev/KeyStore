import * as Icons from "@/assets/icons/user";
import { TouchableNativeFeedback, View } from "react-native";

export function Icon({
  iconId,
  disabled = false,
  onPressIn,
  onPress,
  size = 40,
  className = ""
}: {
  iconId: string;
  disabled?: boolean;
  onPressIn?: () => void;
  onPress?: () => void;
  size?: number;
  className?: string;
}) {
  if (!iconId) return null;
  const Icon: IconI = (Icons as any)[iconId];
  return (
    <TouchableNativeFeedback onPressIn={onPressIn} onPress={onPress} disabled={disabled}>
      <View className={`items-center justify-center p-2 ${className}`}>
        <Icon width={size} height={size} />
      </View>
    </TouchableNativeFeedback>
  );
}
