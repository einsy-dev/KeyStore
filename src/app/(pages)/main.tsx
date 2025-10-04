import { GroupList } from "@/widgets/main";
import { HeaderMain } from "@/widgets/main/ui/HeaderMain";
import { View } from "react-native";

export default function Main() {
  return (
    <View className="app flex-1 py-2">
      <HeaderMain />
      <GroupList />
    </View>
  );
}
