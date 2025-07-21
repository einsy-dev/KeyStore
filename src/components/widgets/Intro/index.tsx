import { createKey, deleteIntro, updateIntro } from "@/lib/store/data";
import { setContextMenu, setModal } from "@/lib/store/modal";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Item } from "./Item";

export function Intro({ data }: { data: DataI }) {
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const menu = [
    {
      name: "New Into Item",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            data: { name: "", value: "" },
            onSubmit: (key) => {
              dispatch(createKey({ introId: data.id!, key }));
            }
          })
        );
      }
    },
    {
      name: "Edit",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            data: { name: data.name },
            onSubmit: (newData) => {
              dispatch(updateIntro({ id: data.id!, name: newData.name }));
            }
          })
        );
      }
    },
    {
      name: "Delete",
      callback: () => {
        dispatch(deleteIntro({ id: data.id! }));
      }
    }
  ];

  return (
    <View className="my-1 flex-1">
      <TouchableOpacity
        onPress={() => setActive((prev) => !prev)}
        onLongPress={() => dispatch(setContextMenu({ active: true, menu }))}
        className="w-full"
      >
        <View className="border rounded">
          <Text className="px-3 py-2 text-3xl">{data.name}</Text>
        </View>
      </TouchableOpacity>
      <View className={`flex-1 ms-4 mt-1 ${active ? "" : "hidden"}`}>
        {data.keys.map((key: any) => (
          <Item key={key.id} introId={data.id!} introKey={key} />
        ))}
      </View>
    </View>
  );
}
