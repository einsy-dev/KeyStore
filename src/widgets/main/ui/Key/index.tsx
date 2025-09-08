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
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={() => {
        handleLongPress();
      }}
      delayPressOut={200}
      className="flex-1"
    >
      <View className="app rounded relative px-4 py-2">
        <Text className={`text text-xl ${data.hide ? "top-1" : ""}`} numberOfLines={1} lineBreakMode="clip">
          {data.hide ? "*".repeat(data.value.length) : data.value}
        </Text>
        {data.label ? <Text className="text absolute left-1 -top-[10px] px-1">{data.label}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}
