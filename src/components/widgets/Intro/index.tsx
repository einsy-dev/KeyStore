import { createKey, deleteIntro, updateIntro } from "@/lib/store/data";
import { setContextMenu, setModal } from "@/lib/store/modal";
import { Text, View } from "@/shared";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { Item } from "./Item";

export function Intro({ data }: { data: DataI }) {
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const Arrow = active ? ChevronDown : ChevronUp;

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
              dispatch(setModal({ active: false }));
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
      <Pressable
        onPress={() => setActive((prev) => !prev)}
        onLongPress={() => dispatch(setContextMenu({ active: true, menu }))}
      >
        <View className="intro_v pe-6 rounded-3xl overflow-hidden flex-row justify-between items-center">
          <Pressable
            onLongPress={() => {
              console.log("press");
            }}
          >
            <View className="px-2 py-4 items-center justify-center">
              <GripVertical
                color={colorScheme === "light" ? "black" : "white"}
              />
            </View>
          </Pressable>
          <Text className="intro_t text-3xl w-80 py-4">{data.name}</Text>
          <Arrow color={colorScheme === "light" ? "black" : "white"} />
        </View>
      </Pressable>
      {data.keys.length ? (
        <View className={`ms-5 mt-1 ${active ? "" : "hidden"}`}>
          {data.keys.map((key: any) => (
            <Item key={key.id} introId={data.id!} introKey={key} />
          ))}
        </View>
      ) : null}
    </View>
  );
}
