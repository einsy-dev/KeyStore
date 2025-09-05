import { Icons } from "@/shared/icons";
import { useEffect, useState } from "react";
import { FlatList, TouchableNativeFeedback } from "react-native";
import { Icon } from "../Icon";
import { View } from "../shared/View";

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

  const renderItem = ({ item }: { item: string[] }) => (
    <View className="flex-row">
      {item.map((el, index) => (
        <View className="m-[4px]" key={index}>
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
  );

  const data = Object.keys(Icons).reduce(
    (acc, el: string, index) => {
      const arrIndex = Math.floor(index / itemsPerLine);
      if (!Array.isArray(acc[arrIndex])) acc[arrIndex] = [];
      acc[arrIndex].push(el);
      return acc;
    },
    [[]] as string[][]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item: string[]) => item.toString()}
      renderItem={renderItem}
      extraData={selected}
      className={`h-[180px] w-full ${className}`}
      contentContainerClassName={contentContainerClassName}
    />
  );
}
