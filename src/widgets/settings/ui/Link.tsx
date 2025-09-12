import { Pressable, Text } from "react-native";

export function Link({ title, cb }: { title: string; cb: () => void }) {
  return (
    <Pressable onPress={() => cb()}>
      <Text className="text text-xl py-2">{title}</Text>
    </Pressable>
  );
}
