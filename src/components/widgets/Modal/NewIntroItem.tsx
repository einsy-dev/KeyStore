import { newIntroItem } from "@/lib/store/app";
import { useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";

export function NewIntroItem({ modal }: { modal: ModalI }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <View className="rounded p-4 bg-white w-full gap-4">
        <Text className="text-center text-2xl">{modal.data?.name}</Text>
        <TextInput
          className="border rounded px-4"
          value={name}
          onChangeText={(text) => {
            setName((prev) => {
              prev = text;
              return prev;
            });
          }}
        />
        <TextInput
          className="border rounded px-4"
          value={value}
          onChangeText={(text) => {
            setValue((prev) => {
              prev = text;
              return prev;
            });
          }}
        />
      </View>
      <TouchableHighlight
        onPress={() =>
          dispatch(
            newIntroItem({ id: modal.data!.id as number, key: { name, value } })
          )
        }
        className="rounded bg-white w-full py-2"
      >
        <Text className="text-center text-xl">Save</Text>
      </TouchableHighlight>
    </>
  );
}
