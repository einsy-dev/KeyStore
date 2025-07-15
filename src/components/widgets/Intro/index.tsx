import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Item } from "./Item";

export function Intro({
  name,
  data
}: {
  name: string;
  data: { [key: string]: string };
}) {
  const [active, setActive] = useState(false);
  return (
    <View className="my-1 flex-1">
      <TouchableOpacity
        onPress={() => setActive((prev) => !prev)}
        className="w-full"
      >
        <View className="border rounded">
          <Text className="px-3 py-2 text-3xl">{name}</Text>
        </View>
      </TouchableOpacity>
      <View className={`flex-1 ms-4 mt-1 ${active ? "" : "hidden"}`}>
        {Object.keys(data).map((key) => (
          <Item key={key} name={key} value={data[key]} />
        ))}
      </View>
    </View>
  );
}
