import { Circle, CircleCheckBig } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../text";
import { View } from "../view";

export function Radio({
  data,
  onSelected
}: {
  data: string[];
  onSelected: (item: string | null) => void;
}) {
  const { colorScheme } = useColorScheme();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    console.log(selected);
    onSelected(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const color = colorScheme === "dark" ? "white" : "";

  return (
    <View className="flex-row gap-4">
      {data.map((el, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelected((prev) => (prev === el ? null : el))}
        >
          <View className="flex-row items-center gap-2">
            {selected === el ? (
              <CircleCheckBig color={color} />
            ) : (
              <Circle color={color} />
            )}
            <Text>{el}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
