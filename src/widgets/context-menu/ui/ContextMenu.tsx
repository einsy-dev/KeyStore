import { useGoBack } from "@/hooks/useGoBack";
import { selectMenu, setMenu } from "@/lib/store/app";
import { OpacityDecorator, SlideDecorator } from "@/shared/decorators";
import { Dimensions, Pressable, View } from "react-native";

import { delay } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { ContextMenuItem } from "./ContextMenuItem";

export function ContextMenu() {
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
            <View className="card rounded-2xl gap-4 p-4 pb-6">
              {menu.menu?.map((el: any) => (
                <ContextMenuItem
                  key={el.name}
                  title={el.name}
                  Icon={el.icon}
                  onPress={() => {
                    dispatch(setMenu({ active: false }));
                    delay(el.callback, 100);
                  }}
                />
              ))}
            </View>
          </Pressable>
        </Pressable>
      </SlideDecorator>
    </>
  );
}
