import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export function ContextMenu({ menu }: ContextMenuI) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="rounded-t-xl mt-auto gap-4 overflow-hidden p-4 pb-6 item">
      {menu?.map((el: any) => (
        <TouchableOpacity
          key={el.name}
          onPress={() => {
            el.callback();
          }}
        >
          <View className="flex-row items-center gap-6">
            <View>
              <el.icon
                color={colorScheme === "dark" ? "white" : "black"}
                height={20}
              />
            </View>
            <Text className="text-xl item ">{el.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
