import { setMenu } from "@/lib/store/app";
import { Options } from "@/shared/ui/Header/Options";
import { useMainMenu } from "@/widgets/context-menu";
import { View } from "react-native";
import { useDispatch } from "react-redux";

export function HeaderMain() {
  const menu = useMainMenu();
  const dispatch = useDispatch();
  return (
    <View className="header !justify-end">
      <Options onPress={() => dispatch(setMenu({ active: true, menu }))} />
    </View>
  );
}
