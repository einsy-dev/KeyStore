import { SelectIcon } from "@/components/selectIcon";
import { Button, Text, TextInput, View } from "@/components/shared";
import { setGroup } from "@/lib/store/data";
import { isObjectHas } from "@/utils";
import { capitalize } from "@/utils/capitalize";
import { createId } from "@paralleldrive/cuid2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function KeyGroupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { name = "" } = useLocalSearchParams<any>();
  const [form, setForm] = useState<any>({ name });
  const [icon, setIcon] = useState<string | null>(null);
  const [err, setErr] = useState<string>("");

  function handleSubmit() {
    if (!isObjectHas(form, { name: true })) {
      return setErr("Please fill all fields");
    }
    dispatch(setGroup({ id: createId(), ...form, keys: {}, icon }));
    setErr("");
    setForm((prev: any) =>
      Object.keys(prev).reduce((acc: any, el: any) => {
        acc[el] = "";
        return acc;
      }, {})
    );
    router.back();
  }

  return (
    <View className="app flex-1 p-2">
      <View className="p-4 gap-4 rounded-2xl item overflow-hidden justify-between">
        <View className="border border-t-0 border-x-0">
          <Text className="text-2xl">Select Icon</Text>
          <SelectIcon className="py-1" onSelect={(id) => setIcon(id)} />
        </View>
        <View className=" justify-center">
          {Object.keys(form).map((key) => (
            <View key={key} className="gap-2">
              <Text className="text-2xl">{capitalize(key)}</Text>
              <TextInput
                onChangeText={(text) =>
                  setForm((prev: any) => ({ ...prev, [key]: text }))
                }
              />
            </View>
          ))}
          <Text className="text-v-red">{err}</Text>
        </View>
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </View>
  );
}
