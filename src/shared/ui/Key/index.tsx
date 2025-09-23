import { setMenu } from "@/lib/store/app";
import { copyText } from "@/utils";
import { useKeyMenu } from "@/widgets/context-menu";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export function Key({
  groupId,
  data,
  onPress,
  onLongPress
}: {
  groupId: string;
  data: KeyI;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
}) {
  const menu = useKeyMenu(groupId, data);
  const dispatch = useDispatch();

  function handleLongPress(value: string) {
    dispatch(setMenu({ active: true, menu: menu(value) }));
  }

  return (
    <View key={data.id} className="flex-row flex-1 gap-2">
      <KeyItem
        data={data.name}
        onPress={(e) => (onPress ? onPress(e) : copyText(data.name.value))}
        onLongPress={(e) => (onLongPress ? onLongPress(e) : handleLongPress(data.name.value))}
      />
      <KeyItem
        data={data.value}
        onPress={() => copyText(data.value.value)}
        onLongPress={() => handleLongPress(data.name.value)}
      />
    </View>
  );
}

function KeyItem({
  data,
  onPress,
  onLongPress
}: {
  data: KeyNameI | KeyValueI;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
}) {
  if (!data || !data.value) return null;
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} delayPressOut={100} className="flex-1">
      <View className="app rounded relative px-4 py-2">
        <Text className={`text text-xl }`} numberOfLines={1}>
          {data.hide ? "*".repeat(data.value.length) : data.value}
        </Text>
        {data.label ? (
          <Text className="text text-sm absolute left-1 -top-[4px] px-1" numberOfLines={1}>
            {data.label}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
