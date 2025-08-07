import { setMenu } from "@/lib/store/app";
import { Divider, Text, View } from "@/shared";
import * as Clipboard from "expo-clipboard";
import { ClipboardCheck } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { TouchableNativeFeedback } from "react-native";
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
  return (
    <View className="flex-1 gap-1">
      <View className="flex-1 rounded overflow-hidden">
        <TouchableNativeFeedback
          onPress={(e) => {
            setActive(true);
            setTimeout(() => {
              setActive(false);
            }, 950);
            copy(data.value);
          }}
          onLongPress={() =>
            dispatch(
              setMenu({
                active: true,
                menu
              })
            )
          }
          delayPressOut={1000}
          background={TouchableNativeFeedback.Ripple("red", false, 100)}
        >
          <View className="flex-1 flex-row gap-2 items-center  p-2 relative">
            <View className="absolute inset-0 items-end justify-center ">
              {active && (
                <ClipboardCheck
                  height={20}
                  color={colorScheme === "light" ? "black" : "white"}
                />
              )}
            </View>
            <Text className="text-xl">
              {data.hide ? "*".repeat(data.value.length) : data.value}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Divider className="w-full" />
    </View>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
