import { Text, View } from "react-native";

export function Divider({ title }: { title: string }) {
  return (
    <View className="border border-t-0 border-x-0">
      <Text className="text text-2xl">{title}</Text>
    </View>
  );
}
