import { setMenu } from "@/lib/store/app";
import { Text, View } from "@/shared";
import * as Clipboard from "expo-clipboard";
import { ClipboardCheck } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useMenu } from "./useMenu";

export function Key({
  groupId,
  id,
  data
}: {
  groupId: string;
  id: string;
  data: KeyElementI;
}) {
  const dispatch = useDispatch();
  const menu = useMenu(groupId, id);
  const { colorScheme } = useColorScheme();
  const [active, setActive] = useState(false);

  function handlePress(e: GestureResponderEvent) {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1200);
    copy(data.value);
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
    <View className="flex-1 rounded border px-2 relative">
      {data.label ? (
        <Text className="item absolute left-1 -top-[8px] px-1 text-xs">
          {data.label}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayPressOut={200}
      >
        <View className="flex-1 flex-row gap-2 items-center relative py-1">
          <Text className="text-xl flex-1" numberOfLines={1}>
            {data.hide ? "*".repeat(data.value.length) : data.value}
          </Text>
          {active && (
            <ClipboardCheck
              height={18}
              width={18}
              viewBox="4 1 10 22"
              fill="hsl(0, 0%, 20%)"
              color={colorScheme === "light" ? "black" : "white"}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
