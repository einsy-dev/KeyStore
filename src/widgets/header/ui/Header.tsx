import { selectHeader } from "@/lib/store/app";
import { View } from "react-native";
import { useSelector } from "react-redux";

export function Header() {
  const header = useSelector(selectHeader);

  return <View></View>;
}
