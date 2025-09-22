import { setMenu } from "@/lib/store/app";
import { useColor } from "@/shared/hooks";
import { useMainMenu } from "@/widgets/context-menu";
import { HeaderButton } from "@/widgets/header";
import { ChevronLeft, EllipsisVertical } from "lucide-react-native";
import { View } from "react-native";
import { useDispatch } from "react-redux";

export function HeaderControlsEdit() {
  const dispatch = useDispatch();
  const menu = useMainMenu();
  const { color } = useColor();

  return (
    <View className="flex-row gap-4">
      <HeaderButton onPress={() => {}} radius={15}>
        <ChevronLeft color={color} size={30} />
      </HeaderButton>
      <HeaderButton
        radius={15}
        onPress={() => {
          dispatch(setMenu({ active: true, menu }));
        }}
      >
        <EllipsisVertical width={30} height={30} />
      </HeaderButton>
    </View>
  );
}
