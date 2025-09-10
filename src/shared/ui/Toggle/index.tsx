import { ColorDecorator, SlideDecorator } from "@/shared/decorators";
import { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";

interface StateI {
  active?: boolean;
  setActive?: Dispatch<SetStateAction<boolean>>;
}

export function Toggle({ active = false, setActive = () => undefined }: StateI) {
  return (
    <Pressable onPress={() => setActive(!active)}>
      <View className="rounded-full overflow-hidden h-10 w-24">
        <ColorDecorator
          active={active}
          colorStart="#00e600"
          colorEnd="red"
          config={{ duration: 400 }}
          decorate="backgroundColor"
        >
          <SlideDecorator active={active} config={{ translate: "x", startX: 0, endX: 48, duration: 300 }}>
            <View className="p-1">
              <View className="card aspect-square h-full rounded-full"></View>
            </View>
          </SlideDecorator>
        </ColorDecorator>
      </View>
    </Pressable>
  );
}
