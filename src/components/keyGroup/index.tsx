import { setMenu } from "@/lib/store/app";
import { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon";
import { useGroupMenu } from "../Menu/useGroupMenu";
import { Text, View } from "../shared";

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
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const menu = useGroupMenu(id);

  function handleMenu() {
    dispatch(
      setMenu({
        active: true,
        menu
      })
    );
  }
  return (
    <View className={`item ${className}`}>
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
            onLongPress={handleMenu}
            className="flex-1"
          >
            <View className="flex-1 px-4 items-center justify-center">
              <Text className="text-2xl w-full" numberOfLines={1}>
                {data.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {children && active ? children : null}
    </View>
  );
}
