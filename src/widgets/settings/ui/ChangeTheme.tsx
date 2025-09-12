import { i18 } from "@/lib/i18n";
import { useConfig } from "@/lib/providers";
import { Text, View } from "react-native";

// dispatch modal
export function ChangeTheme() {
  const { setConfig, theme } = useConfig();

  return (
    <View className="">
      <Text className="text text-xl">{i18("settings.apperance")}</Text>
    </View>
  );
}
