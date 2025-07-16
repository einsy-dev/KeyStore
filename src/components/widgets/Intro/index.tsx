import { setModal } from "@/lib/store/app";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Item } from "./Item";

export function Intro({ data }: { data: DataI }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  return (
    <View className="my-1 flex-1">
      <TouchableOpacity
        onPress={() => setActive((prev) => !prev)}
        onLongPress={() =>
          dispatch(setModal({ active: true, type: "IntroItem", data }))
        }
        className="w-full"
      >
        <View className="border rounded">
          <Text className="px-3 py-2 text-3xl">{data.name}</Text>
        </View>
      </TouchableOpacity>
      <View className={`flex-1 ms-4 mt-1 ${active ? "" : "hidden"}`}>
        {data.keys?.map((key) => (
          <Item key={key.id} data={key} />
        ))}
      </View>
    </View>
  );
}
