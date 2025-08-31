import { View } from "@/shared";
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <View className="app flex-1">
      <Redirect href={"/Auth"} />
    </View>
  );
}
