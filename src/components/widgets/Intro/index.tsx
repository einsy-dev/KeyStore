import { createKey, deleteIntro, updateIntro } from "@/lib/store/data";
import { setContextMenu, setModal } from "@/lib/store/modal";
import { Text, View } from "@/shared";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
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
      >
        <Text className="intro_t px-6 py-4 text-3xl rounded-2xl">{data.name}</Text>
      </TouchableOpacity>
      <View className={`ms-5 mt-1 ${active ? "" : "hidden"}`}>
        {data.keys.map((key: any) => (
          <Item key={key.id} introId={data.id!} introKey={key} />
        ))}
      </View>
    </View>
  );
}
