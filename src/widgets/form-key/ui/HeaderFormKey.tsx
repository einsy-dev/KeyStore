import { GoBack } from "@/shared/ui/Header/GoBack";
import { Submit } from "@/shared/ui/Header/Submit";
import { View } from "react-native";

export function HeaderFormKey({ onSubmit }: { onSubmit: () => void }) {
  return (
    <View className="header">
      <GoBack />
      <Submit onPress={onSubmit} />
    </View>
  );
}
