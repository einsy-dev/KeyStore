import { setMenu } from "@/lib/store/app";
import { Ellipsis } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode, useState } from "react";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon";
import { Text, View } from "../shared";
import { useMenu } from "./useMenu";

export function KeyGroup({
  id,
  data,
  children,
  className = "",
  drag
}: {
  id: string;
  data: DataI;
  children?: ReactNode;
  className?: string;
  drag: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const menu = useMenu(id);

  function handleMenu() {
    dispatch(
      setMenu({
        active: true,
        menu
      })
    );
  }
  return (
    <View className={`item rounded-xl ${className}`}>
      <View className="flex-row py-1">
        <View className="items-center justify-center">
          <TouchableOpacity onPressIn={drag}>
            <View className="p-3">
              <Icon iconId={data.icon || 0} />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => setActive((prev) => !prev)}
            className="flex-1"
          >
            <View className="flex-1 px-4 items-center justify-center">
              <Text className="text-2xl w-full" numberOfLines={1}>
                {data.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="items-center justify-center">
          <TouchableNativeFeedback
            onPress={handleMenu}
            background={TouchableNativeFeedback.Ripple(
              "hsl(0, 0%, 50%)",
              true,
              22
            )}
          >
            <View className="p-3">
              <Ellipsis color={colorScheme === "light" ? "black" : "white"} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      {children && active ? children : null}
    </View>
  );
}
