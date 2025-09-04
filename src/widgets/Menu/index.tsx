import { Text } from "@/components/shared/Text";
import { View } from "@/components/shared/View";
import { selectMenu, setMenu } from "@/lib/store/app";
import { useColor } from "@/shared/hooks/useColor";
import { useGoBack } from "@/shared/hooks/useGoBack";
import { useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export function Menu() {
  const color = useColor();
  const menu: MenuI = useSelector(selectMenu);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const segments = useSegments();

  useEffect(() => {
    dispatch(setMenu({ active: false }));
  }, [segments, dispatch]);

  const opaque = useSharedValue(1);
  const translateY = useSharedValue(300);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        opaque.value,
        [0, 1],
        ["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0)"]
      )
    };
  });

  useEffect(() => {
    if (menu.active) {
      setActive(true);
      opaque.value = withTiming(0);
      translateY.value = withSpring(0, { dampingRatio: 1, duration: 500 });
    } else {
      opaque.value = withTiming(1, {}, () => runOnJS(setActive)(false));
      translateY.value = withSpring(300, { duration: 200 });
    }
  }, [menu, translateY, opaque]);

  useGoBack(() => {
    if (menu.active) {
      dispatch(setMenu({ active: false }));
      return true;
    }
    return false;
  }, [menu]);

  return (
    <Animated.View
      className={active ? "absolute inset-0 bg-transparent" : "hidden"}
      style={[animatedStyle]}
    >
      <Pressable
        onPress={() => {
          dispatch(setMenu({ active: false }));
        }}
        className="flex-1 justify-end"
      >
        {/*  */}
        <Animated.View style={{ transform: [{ translateY: translateY }] }}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="rounded-t-xl gap-4 p-4 pb-6 item">
              {menu.menu?.map((el: any) => (
                <TouchableOpacity
                  key={el.name}
                  onPress={async () => {
                    dispatch(setMenu({ active: false }));
                    setTimeout(() => {
                      el.callback();
                    }, 0);
                  }}
                >
                  <View className="flex-row items-center gap-6">
                    <View>
                      <el.icon color={color.iconColor} height={20} />
                    </View>
                    <Text className="text-xl item ">{el.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Animated.View>
        {/*  */}
      </Pressable>
    </Animated.View>
  );
}
