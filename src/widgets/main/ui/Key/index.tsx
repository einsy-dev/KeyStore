import { setMenu } from "@/lib/store/app";
import { copyText } from "@/utils";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useKeyMenu } from "./useMenu";

export function Key({ groupId, keyId, data }: { groupId: string; keyId: string; data: KeyElementI }) {
  const dispatch = useDispatch();
  const menu = useKeyMenu(groupId, keyId, data.value);

  function handlePress() {
    copyText(data.value);
  }

  function handleLongPress() {
    dispatch(
      setMenu({
        active: true,
        menu
      })
    );
  }

  if (!data.value) return null;
  return (
    <View className="flex-1 rounded  px-2 relative">
      {data.label ? (
        <Text className="border-b border-v-red absolute left-1 -top-[10px] px-1 text-xs">{data.label}</Text>
      ) : null}
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={() => {
          handleLongPress();
        }}
        delayPressOut={200}
      >
        <View className="flex-1 flex-row gap-2 items-center relative py-1">
          <Text className="text-xl flex-1" numberOfLines={1}>
            {data.hide ? "*".repeat(data.value.length) : data.value}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
