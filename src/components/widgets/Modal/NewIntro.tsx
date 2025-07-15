import { useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

export function NewIntro({
  onSubmit = (data) => data
}: {
  onSubmit?: (data: string) => void;
}) {
  const [name, setName] = useState("");

  return (
    <>
      <View className="rounded p-4 bg-white w-full">
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
      </View>
      <TouchableHighlight
        onPress={() => {
          onSubmit(name);
        }}
        className="rounded bg-white w-full py-2"
      >
        <Text className="text-center text-xl">Save</Text>
      </TouchableHighlight>
    </>
  );
}
