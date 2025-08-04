import { setModal } from "@/lib/store/app";
import data from "@/lib/store/data";
import { Ellipsis, Globe } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ContextMenu } from "../ContextMenu";
import { useMenu } from "./useMenu";

export function KeyGroup({
  children,
  drag
}: {
  children?: ReactNode;
  drag: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const menu = useMenu();
  return (
    <Pressable
      onPress={() => setActive((prev) => !prev)}
      onLongPress={() =>
        dispatch(
          setModal({
            active: true,
            component: <ContextMenu name={data.name} menu={menu} />,
            position: "bottom"
          })
        )
      }
    >
      <View className="my-1 flex-row items-center">
        <TouchableOpacity onPressIn={drag}>
          <View className="px-2 py-4 items-center justify-center">
            <Globe color={colorScheme === "light" ? "black" : "white"} />
          </View>
        </TouchableOpacity>
        <View className=" item pe-6 flex-row justify-between items-center  border-x-0 border-t-0 border">
          <Text className="item text-3xl w-80 py-4" numberOfLines={1}>
            {data.name}
          </Text>
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
      {children && active ? (
        <View className="ms-5 mt-1">{children}</View>
      ) : null}
    </Pressable>
  );
}
