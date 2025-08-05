import { setModal } from "@/lib/store/app";
import { Ellipsis } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ContextMenu } from "../contextMenu";
import { Icon } from "../Icon";
import { useMenu } from "./useMenu";

export function KeyGroup({
  id,
  data,
  children,
  drag
}: {
  id: string;
  data: DataI;
  children?: ReactNode;
  drag: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const menu = useMenu(id);

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
      <View className="w-full flex-row ">
        <TouchableOpacity onPressIn={drag}>
          <View className="py-4 pe-4">
            <Icon iconId={data.icon || 0} />
          </View>
        </TouchableOpacity>
        <View className="border-x-0 border-t-0 border flex-1">
          <View className="item flex-row items-center justify-between py-3">
            <Text className="item text-3xl w-[80%]" numberOfLines={1}>
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
            >
              <Ellipsis color={colorScheme === "light" ? "black" : "white"} />
            </Pressable>
          </View>
          {children && active ? children : null}
        </View>
      </View>
    </Pressable>
  );
}
