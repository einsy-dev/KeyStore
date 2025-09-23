import { setHeader, setMenu } from "@/lib/store/app";
import { useMainMenu } from "@/widgets/context-menu";
import { GroupList } from "@/widgets/main";
import { useFocusEffect } from "expo-router";
import { View } from "react-native";
import { useDispatch } from "react-redux";

export default function Main() {
  const dispatch = useDispatch();
  const menu = useMainMenu();

  useFocusEffect(() => {
    dispatch(setHeader({ active: true, onMenu: () => dispatch(setMenu({ active: true, menu })) }));
  });

  return (
    <View className="app flex-1 px-4 py-2">
      <GroupList />
    </View>
  );
}
