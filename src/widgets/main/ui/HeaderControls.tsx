import { setMenu } from "@/lib/store/app";
import { useMainMenu } from "@/widgets/context-menu";
import { HeaderButton } from "@/widgets/header";
import { EllipsisVertical } from "lucide-react-native";
import { View } from "react-native";
import { useDispatch } from "react-redux";

export function HeaderControls({ setStatus }: { setStatus: React.Dispatch<"view" | "edit"> }) {
  const dispatch = useDispatch();
  const menu = useMainMenu();
  return (
    <View className="ml-auto flex-row gap-4">
      <HeaderButton
        onPress={() => {
          dispatch(setMenu({ active: true, menu }));
        }}
        radius={15}
      >
        <EllipsisVertical width={30} height={30} />
      </HeaderButton>
    </View>
  );
}
