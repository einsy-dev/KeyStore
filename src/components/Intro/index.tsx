import { Text, View } from "@/shared";
import { setModal } from "@/store/app";
import { createKey, deleteIntro, updateIntro } from "@/store/data";
import { Confirm, ContextMenu, Form } from "@/widgets";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { Item } from "./Item";

export function Intro({ data, drag }: { data: DataI; drag: any }) {
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const Arrow = active ? ChevronUp : ChevronDown;

  const menu = [
    {
      name: "New Into Item",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <Form
                data={{ name: "", value: "" }}
                onSubmit={(key: any) => {
                  dispatch(createKey({ introId: data.id!, key }));
                }}
              />
            )
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
            component: (
              <Form
                data={{ name: data.name }}
                onSubmit={(intro: any) => {
                  dispatch(updateIntro({ id: data.id!, name: intro.name }));
                }}
              />
            )
          })
        );
      }
    },
    {
      name: "Delete",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <Confirm
                title="Are you sure?"
                onSubmit={() => {
                  dispatch(deleteIntro({ id: data.id! }));
                  dispatch(setModal({ active: false }));
                }}
                onReject={() => dispatch(setModal({ active: false }))}
              />
            )
          })
        );
      }
    }
  ];

  return (
    <View className="my-1">
      <Pressable
        onPress={() => setActive((prev) => !prev)}
        onLongPress={() =>
          dispatch(
            setModal({
              active: true,
              component: <ContextMenu name={data.name} menu={menu} />,
              position: "bottom"
            })
          )
        }
      >
        <View className="intro_v pe-6 rounded-3xl overflow-hidden flex-row justify-between items-center">
          <TouchableOpacity onPressIn={drag}>
            <View className="px-2 py-4 items-center justify-center">
              <GripVertical
                color={colorScheme === "light" ? "black" : "white"}
              />
            </View>
          </TouchableOpacity>
          <Text className="intro_t text-3xl w-80 py-4" numberOfLines={1}>
            {data.name}
          </Text>
          <Arrow color={colorScheme === "light" ? "black" : "white"} />
        </View>
      </Pressable>
      {data.keys.length && active ? (
        <View className="ms-5 mt-1">
          {data.keys.map((key: any) => (
            <Item key={key.id} introId={data.id!} introKey={key} />
          ))}
        </View>
      ) : null}
    </View>
  );
}
