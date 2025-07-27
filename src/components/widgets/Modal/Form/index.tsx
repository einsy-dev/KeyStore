import { capitalize } from "@/utils/capitalize";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface ValueI {
  [key: string]: string;
}

export function Form({
  data,
  onSubmit,
  required,
  clear = false
}: {
  data: ValueI;
  onSubmit: (value: ValueI) => void;
  required?: { [key: string]: boolean };
  clear?: boolean;
}) {
  const [value, setValue] = useState<ValueI>({});
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    if (data) setValue(data);
    setErr("");
  }, [data]);

  function handleSubmit() {
    if (!validate(value, required)) {
      return setErr("Please fill all fields");
    }
    onSubmit(value);
    setErr("");
    if (clear) {
      setValue((prev) =>
        Object.keys(prev).reduce((acc: any, el: any) => {
          acc[el] = "";
          return acc;
        }, {})
      );
    }
  }

  return (
    <Pressable
      onPress={(e) => e.stopPropagation()}
      className="p-4 border rounded-3xl overflow-hidden justify-between modal"
    >
      <View className="mb-4 justify-center">
        {Object.keys(value).map((key) => (
          <View key={key} className="gap-2 bg-p p-2">
            <Text className="text-2xl modal_t">{capitalize(key)}</Text>
            <TextInput
              value={value[key as keyof DataI].toString()}
              onChangeText={(text) =>
                setValue((prev: any) => ({ ...prev, [key]: text }))
              }
              className="border px-4 py-2 rounded-2xl text-2xl  modal_ti"
            />
          </View>
        ))}
        <Text className="text-v-red">{err}</Text>
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <Text className="text-2xl modal_btn text-center rounded-2xl py-2">
          Submit
        </Text>
      </TouchableOpacity>
    </Pressable>
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
