import { Icons } from "@/lib/icons";
import { createId } from "@paralleldrive/cuid2";
import { useState } from "react";
import { ScrollView, TouchableNativeFeedback } from "react-native";
import { Icon } from "../Icon";
import { View } from "../shared/view";

export function SelectIcon({
  onSelect,
  className = ""
}: {
  onSelect: (id: string) => void;
  className?: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={className}
    >
      {Object.keys(Icons).map((el: string) => (
        <TouchableNativeFeedback
          key={createId()}
          onPress={() => {
            setSelected(el);
            onSelect(el);
          }}
        >
          <View
            className={`aspect-square items-center justify-center rounded-full p-2 ${selected === el && "bg-v-red"}`}
          >
            <Icon iconId={el} />
          </View>
        </TouchableNativeFeedback>
      ))}
    </ScrollView>
  );
}
