import { TextInput } from "@/components/shared";
import { capitalize } from "@/utils/capitalize";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function KeyForm() {
  const { name } = useLocalSearchParams<any>();
  const [value, setValue] = useState<any>({ name });
  const [err, setErr] = useState<string>("");

  function handleSubmit() {
    if (!validate(value, { name: true })) {
      return setErr("Please fill all fields");
    }
    setErr("");
    setValue((prev: any) =>
      Object.keys(prev).reduce((acc: any, el: any) => {
        acc[el] = "";
        return acc;
      }, {})
    );
  }

  return (
    <View className="app flex-1">
      <Pressable
        onPress={(e) => e.stopPropagation()}
        className="p-4 border item rounded-2xl overflow-hidden justify-between"
      >
        <View className="mb-4 justify-center">
          {Object.keys(value).map((key) => (
            <View key={key} className="gap-2 bg-p p-2">
              <Text className="text-2xl item">{capitalize(key)}</Text>
              <TextInput
                onChangeText={(text) =>
                  setValue((prev: any) => ({ ...prev, [key]: text }))
                }
              />
            </View>
          ))}
          <Text className="text-v-red">{err}</Text>
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="border btn text-2xl text-center rounded-2xl py-2">
            Submit
          </Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

function validate(
  data: { [key: string]: string },
  required?: { [key: string]: boolean }
) {
  let res = true;
  Object.keys(data).forEach((key) => {
    if (!data[key] && (!required || required[key] === true))
      return (res = false);
  });
  return res;
}
