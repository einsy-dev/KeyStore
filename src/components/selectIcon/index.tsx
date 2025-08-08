import { Icons } from "@/lib/icons";
import { useEffect, useMemo, useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import { Icon } from "../Icon";
import { View } from "../shared/view";

export function SelectIcon({
  defaultValue = null,
  onSelect,
  itemsPerLine = 6,
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

  const icons = useMemo(() => {
    return Object.keys(Icons).reduce(
      (acc: string[][], el: string, index: number) => {
        let current = Math.floor(index / itemsPerLine);
        if (!Array.isArray(acc[current])) acc[current] = [];
        acc[current].push(el);
        return acc;
      },
      [[]]
    );
  }, [itemsPerLine]);

  return (
    <View className={`gap-2 w-full ${className}`}>
      {icons.map((el: string[], index: number) => (
        <IconsLine
          key={index}
          icons={el}
          selected={selected}
          onSelect={(icon) => {
            setSelected(icon);
          }}
        />
      ))}
    </View>
  );
}

function IconsLine({
  icons,
  selected,
  className = "",
  onSelect
}: {
  icons: string[];
  selected: string | null;
  className?: false | string;
  onSelect: (icon: string) => void;
}) {
  return (
    <View className={`flex-row gap-4 ${className}`}>
      {icons.map((icon) => (
        <TouchableNativeFeedback
          key={icon}
          onPress={() => {
            onSelect(icon);
          }}
        >
          <View
            className={`rounded-full p-2 aspect-square ${selected === icon && "bg-v-red"}`}
          >
            <Icon iconId={icon} />
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
}
