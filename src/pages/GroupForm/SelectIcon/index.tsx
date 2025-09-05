import * as Icons from "@/assets/icons";
import { View } from "@/shared/ui";
import { useEffect, useState } from "react";
import { FlatList, TouchableNativeFeedback } from "react-native";

export function SelectIcon({
  defaultValue = null,
  onSelect,
  className = "",
  contentContainerClassName = "",
  itemsPerLine
}: {
  defaultValue?: string | null;
  itemsPerLine: number;
  onSelect: (id: string | null) => void;
  className?: string;
  contentContainerClassName?: string;
}) {
  const [selected, setSelected] = useState<string | null>(defaultValue);

  useEffect(() => {
    onSelect(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const renderItem = ({ item }: { item: IconI[] }) => (
    <View className="flex-row gap-2 items-center justify-center">
      {item.map((el) => (
        <View key={el.name}>
          <TouchableNativeFeedback
            onPress={() => {
              setSelected(el.name);
            }}
            background={TouchableNativeFeedback.Ripple("hsl(0,0, 50%)", false, 22)}
          >
            <View className={`aspect-square items-center justify-center rounded-full p-2`}>
              <el.Icon width={35} height={35} />
            </View>
          </TouchableNativeFeedback>
        </View>
      ))}
    </View>
  );

  const data = Object.keys(Icons).reduce(
    (acc, key: string, index) => {
      const arrIndex = Math.floor(index / itemsPerLine);
      if (!Array.isArray(acc[arrIndex])) acc[arrIndex] = [];
      acc[arrIndex].push({ name: key, Icon: (Icons as any)[key] });
      return acc;
    },
    [[]] as IconI[][]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item: IconI[]) => item[0].name}
      renderItem={renderItem}
      extraData={selected}
      className={`h-[205px] w-full ${className}`}
      contentContainerClassName={contentContainerClassName}
    />
  );
}
