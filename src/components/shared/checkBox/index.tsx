import { useColor } from "@/hooks/useColor";
import { Square, SquareCheckBig } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { View } from "../View";

export function CheckBox({
  children,
  onPress
}: {
  children: string;
  onPress: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);
  const color = useColor();

  return (
    <TouchableOpacity
      onPress={() => {
        setChecked((prev) => !prev);
        onPress(checked);
      }}
    >
      <View className="flex-row gap-2 ">
        {checked ? <SquareCheckBig color={color} /> : <Square color={color} />}
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
