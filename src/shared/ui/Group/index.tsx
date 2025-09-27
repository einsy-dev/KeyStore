import { setMenu } from "@/lib/store/app";
import { SizeDecorator } from "@/shared/decorators";
import { useGroupMenu } from "@/widgets/context-menu";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon";

export function Group({
  data,
  children,
  className = "",
  drag = () => null,
  active,
  setActive
}: {
  data: GroupI;
  children?: ReactNode;
  className?: string;
  drag?: () => void;
  active: boolean;
  setActive: (id: string) => void;
}) {
  const dispatch = useDispatch();
  const menu = useGroupMenu(data.id ?? null);
  function handleMenu() {
    dispatch(
      setMenu({
        active: true,
        menu
      })
    );
  }
  return (
    <View className={`card rounded ${className}`}>
      <TouchableOpacity onPress={() => setActive(data.id)} onLongPress={handleMenu}>
        <View className="flex-row">
          <Icon
            iconId={data.icon}
            onPressIn={() => {
              drag();
            }}
          />
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
