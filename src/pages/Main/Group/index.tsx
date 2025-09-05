import * as Icons from "@/assets/icons";
import { setMenu } from "@/lib/store/app";
import { Text, View } from "@/shared/ui";
import { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useMenu } from "./useMenu";

export function Group({
  groupId,
  data,
  children,
  className = "",
  drag
  // active,
  // setActive
}: {
  groupId: string;
  data: DataI;
  children?: ReactNode;
  className?: string;
  drag: () => void;
  // active: boolean;
  // setActive: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const dispatch = useDispatch();
  const menu = useMenu(groupId);
  const [active, setActive] = useState(false);
  function handleMenu() {
    dispatch(
      setMenu({
        active: true,
        menu
      })
    );
  }

  const Icon: Icon = (Icons as any)[data.icon];

  return (
    <View className={`${className}`}>
      <View className="flex-row py-1">
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
          <TouchableOpacity onPress={() => setActive((prev) => !prev)} onLongPress={handleMenu} className="flex-1">
            <View className="flex-1 px-4 items-center justify-center">
              <Text className="text-2xl w-full" numberOfLines={1} ellipsizeMode="clip">
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
