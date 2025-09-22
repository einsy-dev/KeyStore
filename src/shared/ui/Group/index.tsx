import * as Icons from "@/assets/icons/user";
import { setMenu } from "@/lib/store/app";
import { ReactNode, useState } from "react";
import { Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { SizeDecorator } from "@/shared/decorators";
import { useGroupMenu } from "@/widgets/context-menu";
import { useDispatch } from "react-redux";

export function Group({
  data,
  edit = false,
  children,
  className = "",
  drag = () => null
}: {
  data: GroupI;
  edit?: boolean;
  children?: ReactNode;
  className?: string;
  drag?: () => void;
}) {
  const dispatch = useDispatch();
  const menu = useGroupMenu(data.id ?? null);
  const [active, setActive] = useState(false);
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
    <View className={`card rounded ${className}`}>
      <TouchableOpacity onPress={() => setActive((prev) => !prev)} onLongPress={handleMenu} disabled={edit}>
        <View className="flex-row">
          <TouchableNativeFeedback onPressIn={() => edit && drag()}>
            <View className="items-center justify-center p-2">
              <Icon width={40} height={40} />
            </View>
          </TouchableNativeFeedback>
          <View className="flex-1 justify-center">
            <View className="flex-1 px-4 items-center justify-center">
              <Text className="text text-2xl w-full" numberOfLines={1} ellipsizeMode="clip">
                {data.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <SizeDecorator active={Boolean(active && children)} contentContainerClassName="w-full">
        <View className="gap-2 p-2">{children}</View>
      </SizeDecorator>
    </View>
  );
}
