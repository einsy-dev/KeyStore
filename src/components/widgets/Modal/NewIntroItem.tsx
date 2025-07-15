import { useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

export function NewIntroItem({
  onSubmit = (introItem: string, value: string) => [introItem, value]
}: {
  onSubmit?: (introItem: string, value: string) => void;
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  return (
    <>
      <View className="rounded p-4 bg-white w-full gap-4">
        <Text className="text-center text-2xl">Add new</Text>
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
        onPress={() => {
          onSubmit(name, value);
        }}
        className="rounded bg-white w-full py-2"
      >
        <Text className="text-center text-xl">Save</Text>
      </TouchableHighlight>
    </>
  );
}
