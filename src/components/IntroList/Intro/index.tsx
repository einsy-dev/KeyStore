import { Text, View } from "@/shared";
import { setModal } from "@/store/app";
import { createKey, deleteIntro, updateIntro } from "@/store/data";
import { Confirm, ContextMenu, Form } from "@/widgets";
import { Ellipsis, Globe } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { IntroItem } from "../IntroItem";

export function Intro({ data, drag }: { data: DataI; drag: any }) {
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

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
                required={{ name: true, value: true }}
                onSubmit={(key: any) => {
                  dispatch(createKey({ introId: data.id!, key }));
                }}
                clear
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
                required={{ name: true }}
                onSubmit={(intro: any) => {
                  dispatch(updateIntro({ id: data.id!, name: intro.name }));
                  dispatch(setModal({ active: false }));
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
                }}
              />
            )
          })
        );
      }
    }
  ];

  return (
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
      <View className="my-1 flex-row items-center">
        <TouchableOpacity onPressIn={drag}>
          <View className="px-2 py-4 items-center justify-center">
            <Globe color={colorScheme === "light" ? "black" : "white"} />
          </View>
        </TouchableOpacity>
        <View className=" item pe-6 flex-row justify-between items-center  border-x-0 border-t-0 border">
          <Text className="item text-3xl w-80 py-4" numberOfLines={1}>
            {data.name}
          </Text>
          <Pressable
            onPress={() =>
              dispatch(
                setModal({
                  active: true,
                  component: <ContextMenu name={data.name} menu={menu} />,
                  position: "bottom"
                })
              )
            }
            className="p-2"
          >
            <Ellipsis color={colorScheme === "light" ? "black" : "white"} />
          </Pressable>
        </View>
      </View>
      {data.keys.length && active ? (
        <View className="ms-5 mt-1">
          {data.keys.map((key: any) => (
            <IntroItem key={key.id} introId={data.id!} introKey={key} />
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}
