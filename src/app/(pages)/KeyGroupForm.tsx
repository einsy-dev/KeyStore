import { SelectIcon } from "@/components/selectIcon";
import { Button, Text, TextInput, View } from "@/components/shared";
import { capitalize } from "@/utils/capitalize";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";

export default function KeyGroupForm() {
  const { name = "" } = useLocalSearchParams<any>();
  const [value, setValue] = useState<any>({ name: name });
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
    <View className="app flex-1 p-2">
      <Pressable onPress={(e) => e.stopPropagation()}>
        <View className="p-4 rounded-2xl item overflow-hidden justify-between">
          <SelectIcon />
          <View className="mb-4 justify-center">
            {Object.keys(value).map((key) => (
              <View key={key} className="gap-2">
                <Text className="text-2xl">{capitalize(key)}</Text>
                <TextInput
                  onChangeText={(text) =>
                    setValue((prev: any) => ({ ...prev, [key]: text }))
                  }
                />
              </View>
            ))}
            <Text className="text-v-red">{err}</Text>
          </View>
          <Button onPress={handleSubmit}>Submit</Button>
        </View>
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
