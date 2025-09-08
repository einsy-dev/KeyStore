import * as Icons from "@/assets/icons";
import { setMenu } from "@/lib/store/app";
import { ReactNode } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

import { useDispatch } from "react-redux";
import { useMenu } from "./useMenu";

export function Group({
  groupId,
  data,
  children,
  className = "",
  drag,
  setActive
}: {
  groupId: string;
  data: DataI;
  children?: ReactNode;
  className?: string;
  drag: () => void;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const dispatch = useDispatch();
  const menu = useMenu(groupId);
  function handleMenu() {
    dispatch(
      setMenu({
        active: true,
        menu
      })
    );
  }

  const Icon: IconI = (Icons as any)[data.icon];

  return (
    <Animated.View className={`${className}`}>
      <View className="flex-row">
        <View className="items-center justify-center">
          <TouchableOpacity
            onPressIn={() => {
              drag();
            }}
          >
            <View className="p-3">
              <Icon width={30} height={30} />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => setActive((prev) => (prev === groupId ? "" : groupId))}
            onLongPress={handleMenu}
            className="flex-1"
          >
            <View className="flex-1 px-4 items-center justify-center">
              <Text className="text text-2xl w-full" numberOfLines={1} ellipsizeMode="clip">
                {data.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {children && children}
    </Animated.View>
  );
}
