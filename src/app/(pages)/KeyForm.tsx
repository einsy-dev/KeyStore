import { Button, Text, TextInput, View } from "@/components/shared";
import { setKey } from "@/lib/store/data";
import { capitalize } from "@/utils/capitalize";
import { createId } from "@paralleldrive/cuid2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";

interface StateI {
  name: KeyElementI;
  value: KeyElementI;
  [key: string]: KeyElementI;
}

export default function KeyGroupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    groupId,
    keyId = createId(),
    name = "",
    value = ""
  } = useLocalSearchParams<any>();
  const [state, setState] = useState<StateI>({
    name: { value: name },
    value: { value: value }
  });
  const [err, setErr] = useState<string>("");

  function handleSubmit() {
    if (!state.name || !state.value) {
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
                  value={state[key].value}
                  onChangeText={(text) =>
                    setState((prev: StateI) => ({
                      ...prev,
                      [key]: { value: text }
                    }))
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
