import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";

export function Intro({
  name,
  children,
  setKey
}: {
  name: string;
  children: ReactNode;
  setKey: Dispatch<SetStateAction<string>>;
}) {
  const [active, setActive] = useState(false);
  return (
    <View className="my-1 flex-row flex-wrap ">
      <TouchableHighlight
        underlayColor="#DDDDDD"
        onLongPress={() => {
          setKey(name);
        }}
        onPress={() => setActive((prev) => !prev)}
        className="w-full"
      >
        <View className="border rounded">
          <Text className="px-4 py-1 text-2xl">{name}</Text>
        </View>
      </TouchableHighlight>
      <View className="ps-5 w-full">
        <View
          className={`w-full border rounded mt-1 ${active ? "" : "hidden"}`}
        >
          {children}
        </View>
      </View>
    </View>
  );
}
