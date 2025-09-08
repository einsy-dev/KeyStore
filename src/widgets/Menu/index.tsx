import { useColor } from "@/hooks/useColor";
import { useGoBack } from "@/hooks/useGoBack";
import { selectMenu, setMenu } from "@/lib/store/app";
import { OpacityDecorator, SlideDecorator } from "@/shared/decorators";
import { Dimensions, Pressable, Text, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

export function Menu() {
  const { color } = useColor();
  const menu: MenuI = useSelector(selectMenu);
  const dispatch = useDispatch();

  useGoBack(() => {
    if (menu.active) {
      dispatch(setMenu({ active: false }));
      return true;
    }
    return false;
  }, [menu]);

  return (
    <>
      <OpacityDecorator
        active={menu.active}
        slideConfig={{ duration: 0, startY: Dimensions.get("screen").height }}
        className="absolute inset-0 flex-1 bg-v-50"
      />
      <SlideDecorator
        active={menu.active}
        config={{ startY: Dimensions.get("screen").height }}
        className="absolute inset-0 flex-1"
      >
        <Pressable
          onPress={() => {
            dispatch(setMenu({ active: false }));
          }}
          className="flex-1 justify-end"
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="rounded-t-xl gap-4 p-4 pb-6">
              {menu.menu?.map((el: any) => (
                <TouchableOpacity
                  key={el.name}
                  onPress={async () => {
                    dispatch(setMenu({ active: false }));
                    setTimeout(() => {
                      el.callback();
                    }, 100);
                  }}
                >
                  <View className="flex-row items-center gap-6">
                    <View>
                      <el.icon color={color} height={30} />
                    </View>
                    <Text className="text text-xl">{el.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </SlideDecorator>
    </>
  );
}
