import { ContextMenu } from "@/components/ContextMenu";
import { setModal } from "@/lib/store/app";
import { CopyText } from "@/shared";
import { Apple, Ellipsis } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useMenu } from "./useMenu";

export function Key({ data }: { data: KeyI }) {
  const dispatch = useDispatch();
  const { colorScheme } = useColorScheme();
  const menu = useMenu();
  return (
    <TouchableOpacity
      onLongPress={(e) => {
        e.stopPropagation();
        dispatch(
          setModal({
            active: true,
            component: <ContextMenu name="" menu={menu} />,
            position: "bottom"
          })
        );
      }}
    >
      <View className="item flex flex-row justify-between  items-center gap-4 px-4 py-3 mb-1 rounded-2xl">
        <Apple color={colorScheme === "light" ? "black" : "white"} />
        <View className="flex-1 flex-row border-x-0 border-t-0 border">
          <View className="flex-1">
            <CopyText>{data.name}</CopyText>
            <CopyText>{data.value}</CopyText>
          </View>
          <Pressable
            onPress={() =>
              dispatch(
                setModal({
                  active: true,
                  component: <ContextMenu name={data.name} menu={menu} />,
                  position: "bottom"
                })
              )
            }
            className="p-2"
          >
            <Ellipsis color={colorScheme === "light" ? "black" : "white"} />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}
