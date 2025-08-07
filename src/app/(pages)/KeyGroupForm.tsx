import { SelectIcon } from "@/components/selectIcon";
import { Button, Text, TextInput, View } from "@/components/shared";
import { selectData, setGroup } from "@/lib/store/data";
import { isObjectHas } from "@/utils";
import { capitalize } from "@/utils/capitalize";
import { createId } from "@paralleldrive/cuid2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function KeyGroupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data: DataListI = useSelector(selectData);
  const { id = createId(), name = "", icon } = useLocalSearchParams<any>();
  const [form, setForm] = useState<any>({ name });
  const [iconState, setIconState] = useState<string | null>(icon);
  const [err, setErr] = useState<string>("");

  function handleSubmit() {
    if (!isObjectHas(form, { name: true })) {
      return setErr("Please fill all fields");
    }
    dispatch(
      setGroup({
        id,
        data: {
          ...form,
          keys: (data[id] && data[id].keys) || {},
          icon: iconState
        }
      })
    );
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
          <SelectIcon
            className="py-1"
            defaultValue={icon}
            onSelect={(id) => setIconState(id)}
          />
        </View>
        <View className=" justify-center">
          {Object.keys(form).map((key) => (
            <View key={key} className="gap-2">
              <Text className="text-2xl">{capitalize(key)}</Text>
              <TextInput
                value={form[key]}
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
