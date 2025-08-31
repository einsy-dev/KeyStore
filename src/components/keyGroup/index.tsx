import { setMenu } from "@/lib/store/app";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon";
import { useGroupMenu } from "../Menu/useGroupMenu";
import { Text, View } from "../shared";

export function KeyGroup({
  groupId,
  data,
  children,
  className = "",
  drag,
  active,
  setActive
}: {
  groupId: string;
  data: DataI;
  children?: ReactNode;
  className?: string;
  drag: () => void;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const dispatch = useDispatch();
  const menu = useGroupMenu(groupId);

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
          <TouchableOpacity
            onPressIn={() => {
              drag();
            }}
          >
            <View className="p-3">
              <Icon iconId={data.icon || 0} />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <TouchableOpacity
            onPress={() =>
              setActive((prev) => (prev === groupId ? null : groupId))
            }
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
