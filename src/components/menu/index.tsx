import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { selectMenu, setMenu } from "@/lib/store/app";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export function Menu() {
  const { colorScheme } = useColorScheme();
  const menu: MenuI = useSelector(selectMenu);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const translateY = useSharedValue(300);

  useEffect(() => {
    if (menu.active) {
      setActive(true);
      translateY.value = withSpring(0, { dampingRatio: 1, duration: 500 });
    } else {
      translateY.value = withSpring(300, { duration: 200 }, () => {
        runOnJS(setActive)(false);
      });
    }
  }, [menu, translateY]);

  return (
    <Pressable
      onPress={() => {
        dispatch(setMenu({ active: false }));
      }}
      className={active ? "absolute inset-0 bg-v-50" : "hidden"}
    >
      <View className="flex-1 justify-end">
        {/*  */}
        <Animated.View style={{ transform: [{ translateY: translateY }] }}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="rounded-t-xl gap-4 p-4 pb-6 item">
              {menu.menu?.map((el: any) => (
                <TouchableOpacity
                  key={el.name}
                  onPress={() => {
                    el.callback();
                    dispatch(setMenu({ active: false }));
                  }}
                >
                  <View className="flex-row items-center gap-6">
                    <View>
                      <el.icon
                        color={colorScheme === "dark" ? "white" : "black"}
                        height={20}
                      />
                    </View>
                    <Text className="text-xl item ">{el.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Animated.View>
        {/*  */}
      </View>
    </Pressable>
  );
}
