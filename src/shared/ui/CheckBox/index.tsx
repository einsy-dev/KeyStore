import { useColor } from "@/shared/hooks/useColor";
import { Square, SquareCheckBig } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { View } from "../View";

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
        {state ? (
          <SquareCheckBig color={color.iconColor} />
        ) : (
          <Square color={color.iconColor} />
        )}
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
