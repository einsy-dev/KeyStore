import { Text, View } from "@/shared";
import { TouchableOpacity } from "react-native";

interface ContextMenuI {
  name: string;
  menu: ContextMenuItemI[];
}
interface ContextMenuItemI {
  name: string;
  callback: (param?: any) => void;
}

export function ContextMenu({ menu }: ContextMenuI) {
  return (
    <View className="rounded-3xl mt-auto  overflow-hidden p-4 border item">
      {menu?.map((el: any) => (
        <TouchableOpacity
          key={el.name}
          onPress={() => {
            el.callback();
          }}
        >
          <Text className="text-2xl px-4 py-1 item">{el.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
