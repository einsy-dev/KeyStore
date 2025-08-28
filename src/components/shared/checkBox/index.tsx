import { Square, SquareCheckBig } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
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
  const { colorScheme } = useColorScheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onPress(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const color = colorScheme === "dark" ? "white" : "";

  return (
    <TouchableOpacity
      onPress={() => {
        setChecked((prev) => !prev);
      }}
    >
      <View className="flex-row gap-2 ">
        {checked ? <SquareCheckBig color={color} /> : <Square color={color} />}
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
