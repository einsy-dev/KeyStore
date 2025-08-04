import { ContextMenu } from "@/components/contextMenu";
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
      <View className="item flex flex-row justify-between gap-2 items-center  mb-1 ">
        <Apple color={colorScheme === "light" ? "black" : "white"} />
        <View className="flex-1 flex-row">
          <View className="flex-1">
            <CopyText className="text-2xl">{data.name}</CopyText>
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
          >
            <Ellipsis color={colorScheme === "light" ? "black" : "white"} />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}
