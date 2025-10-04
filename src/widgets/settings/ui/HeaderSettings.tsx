import { GoBack } from "@/shared/ui/Header/GoBack";
import { View } from "react-native";
import { ChangeLanguage } from "./ChangeLanguage";

export function HeaderSettings() {
  return (
    <View className="header">
      <GoBack />
      <ChangeLanguage />
    </View>
  );
}
