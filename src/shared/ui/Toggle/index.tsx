import { ColorDecorator, SlideDecorator } from "@/shared/decorators";
import { useState } from "react";
import { Pressable, View } from "react-native";

export function Toggle() {
  const [active, setActive] = useState(false);

  return (
    <Pressable onPress={() => setActive((prev) => !prev)}>
      <View className=" h-10 rounded-full overflow-hidden " style={{ width: 80 }}>
        <ColorDecorator
          active={active}
          colorStart="#00e600"
          colorEnd="red"
          config={{ duration: 400 }}
          decorate="backgroundColor"
        >
          <SlideDecorator active={active} config={{ translate: "x", startX: 0, endX: 45, duration: 300 }}>
            <View className="bg-v-light w-10 h-10 rounded-full z-10"></View>
          </SlideDecorator>
        </ColorDecorator>
      </View>
    </Pressable>
  );
}
