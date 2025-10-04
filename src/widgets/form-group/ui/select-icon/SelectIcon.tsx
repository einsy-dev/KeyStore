import * as Icons from "@/assets/icons/user";
import { OpacityDecorator, SlideDecorator } from "@/shared/decorators";
import { KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { delay } from "@/utils";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";
import { parseIcons } from "../../lib/parse";
import { RenderItem } from "./RenderItem";

export function SelectIcon({ onSelect, active, setActive }: SelectIconI) {
  const [search, setSearch] = useState("");
  const data = parseIcons(Icons, 6, search);
  const renderItem = RenderItem(onSelect, 45);

  useEffect(() => {
    delay(() => setSearch(""), 100);
  }, [active]);

  return (
    <>
      <OpacityDecorator
        active={active}
        slideConfig={{ duration: 0, startY: Dimensions.get("screen").height }}
        className="absolute inset-0 flex-1 bg-v-50"
      />
      <SlideDecorator
        active={active}
        config={{ startY: Dimensions.get("screen").height }}
        className="absolute inset-0 flex-1"
      >
        <KeyboardAvoidingView className="flex-1">
          <Pressable onPress={() => setActive(false)} className="flex-1 justify-end">
            <View className="app rounded-2xl h-[350px] py-2 px-4">
              <Pressable onPress={(e) => e.stopPropagation()}>
                <View className="flex-row">
                  <TextInput value={search} onChangeText={setSearch} className="w-full" />
                </View>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => item + "-" + index}
                  keyboardShouldPersistTaps="handled"
                />
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </SlideDecorator>
    </>
  );
}
