import { Button, Text, TextInput, View } from "@/components/shared";
import { selectData, setKey } from "@/lib/store/data";
import { isObjectHas } from "@/utils";
import { capitalize } from "@/utils/capitalize";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function KeyGroupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { groupId, keyId, name = "", value = "" } = useLocalSearchParams<any>();
  const data = useSelector(selectData);
  const [state, setState] = useState<any>({ name, value });
  const [err, setErr] = useState<string>("");

  function handleSubmit() {
    if (!isObjectHas(state, { name: true })) {
      return setErr("Please fill all fields");
    }
    dispatch(
      setKey({
        groupId,
        keyId,
        key: { ...state }
      })
    );
    router.back();
    setErr("");
    setState((prev: any) =>
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
          <View className="mb-4 gap-4 justify-center">
            {Object.keys(state).map((key) => (
              <View key={key} className="gap-2">
                <Text className="text-2xl">{capitalize(key)}</Text>
                <TextInput
                  value={state[key]}
                  onChangeText={(text) =>
                    setState((prev: any) => ({ ...prev, [key]: text }))
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
