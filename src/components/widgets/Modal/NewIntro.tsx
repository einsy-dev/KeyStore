import { newIntro } from "@/lib/store/app";
import { useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";

export function NewIntro({ modal }: { modal: ModalI }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <View className="rounded p-4 bg-white w-full">
        <Text className="text-center text-2xl">Add new</Text>
        <TextInput
          className="border rounded px-4"
          value={name}
          onChangeText={(text) => {
            setName(() => {
              return text.trim();
            });
          }}
        />
      </View>
      <TouchableHighlight
        onPress={() => {
          if (!name) return;
          dispatch(newIntro({ name: name, keys: [] }));
        }}
        // onLongPress={() => {
        //   dispatch(editIntro({ id: modal.data?.id, name: "lol", keys: [] }));
        // }}
        className="rounded bg-white w-full py-2"
      >
        <Text className="text-center text-xl">Save</Text>
      </TouchableHighlight>
    </>
  );
}
