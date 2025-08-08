import { Button, CheckBox, Text, TextInput, View } from "@/components/shared";
import { setKey } from "@/lib/store/data";
import { capitalize } from "@/utils";
import { createId } from "@paralleldrive/cuid2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";

interface StateI {
  name: KeyElementI;
  value: KeyElementI;
  [key: string]: KeyElementI;
}

type LocalSearchParamI = {
  groupId: string;
  keyId: string;
  name: string;
  nameLabel: string;
  value: string;
  valueLabel: string;
};

export default function KeyGroupForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    groupId,
    keyId = createId(),
    name = "",
    nameLabel = "",
    value = "",
    valueLabel = ""
  } = useLocalSearchParams<LocalSearchParamI>();

  const [state, setState] = useState<StateI>({
    name: { value: name, label: nameLabel },
    value: { value: value, label: valueLabel }
  });
  const [err, setErr] = useState<string>("");

  function handleSubmit() {
    if (state.name.value === "Name" && state.value.value === "Value") {
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
    <View className="app flex-1 p-4  justify-between">
      <View className="gap-4">
        {Object.keys(state).map((key) => (
          <View key={key} className="gap-2 rounded-2xl item p-4">
            <FormElement
              state={state[key]}
              setState={(val: any) =>
                setState((prev) => ({ ...prev, [key]: val(prev[key]) }))
              }
              placeHolder={key}
            />
          </View>
        ))}
        <Text className="text-v-red">{err}</Text>
      </View>
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
}

function FormElement({
  state,
  setState,
  placeHolder = ""
}: {
  state: KeyElementI;
  setState: SetStateAction<any>;
  placeHolder?: string;
}) {
  return (
    <View className="gap-2">
      <View className="gap-1">
        <TextInput
          value={state.label || "Label"}
          onChangeText={(text) =>
            setState((prev: KeyElementI) => ({ ...prev, label: text }))
          }
          className="text-xs py-[2px] w-1/3"
        />
        <TextInput
          value={state.value || capitalize(placeHolder)}
          onChangeText={(text) =>
            setState((prev: KeyElementI) => ({ ...prev, value: text }))
          }
          className="text-lg"
        />
      </View>
      <CheckBox
        onPress={(hide) => {
          setState((prev: KeyElementI) => ({ ...prev, hide }));
        }}
      >
        Hide
      </CheckBox>
    </View>
  );
}
