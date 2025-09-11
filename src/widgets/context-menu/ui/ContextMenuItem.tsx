import { useColor } from "@/shared/hooks";
import { Text, TouchableOpacity, View } from "react-native";

interface ContextMenuItemI {
  title: string;
  Icon: IconI;
  onPress: () => void;
}

export function ContextMenuItem({ title, Icon, onPress }: ContextMenuItemI) {
  const { color } = useColor();

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center gap-6">
        <View>
          <Icon color={color} height={30} />
        </View>
        <Text className="text text-xl">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
