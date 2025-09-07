import { useColor } from "@/hooks/useColor";
import { Square, SquareCheckBig } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function CheckBox({
  checked = false,
  onChange,
  children
}: {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  children: string;
}) {
  const [state, setState] = useState(checked);
  const color = useColor();

  return (
    <TouchableOpacity
      onPress={() => {
        setState((prev) => {
          onChange(!prev);
          return !prev;
        });
      }}
    >
      <View className="flex-row gap-2 ">
        {state ? <SquareCheckBig color={color.iconColor} /> : <Square color={color.iconColor} />}
        <Text className="text">{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
