import { Icons } from "@/lib/icons";
import { useEffect, useState } from "react";
import { ScrollView, TouchableNativeFeedback } from "react-native";
import { Icon } from "../Icon";
import { View } from "../shared/View";

export function SelectIcon({
  defaultValue = null,
  onSelect,
  className = ""
}: {
  defaultValue?: string | null;
  itemsPerLine?: number;
  onSelect: (id: string | null) => void;
  className?: string;
}) {
  const [selected, setSelected] = useState<string | null>(defaultValue);

  useEffect(() => {
    onSelect(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <ScrollView scrollEnabled className={`h-[170px] w-full ${className}`}>
      <View className="flex-row flex-wrap ">
        {Object.keys(Icons).map((el: string) => (
          <View key={el} className="m-[4px] ">
            <TouchableNativeFeedback
              onPress={() => {
                setSelected(el);
              }}
              background={TouchableNativeFeedback.Ripple(
                "hsl(0,0, 50%)",
                false,
                22
              )}
            >
              <View
                className={`rounded-full aspect-square  p-[8px] ${selected === el && "border !p-[6px]"}`}
              >
                <Icon iconId={el} />
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
