import { KeyMode } from "@/components/keyMode";
import { Button, CheckBox, Text, TextInput, View } from "@/components/shared";
import { setKey } from "@/lib/store/data";
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
  const [type, setType] = useState<KeyModeT>("double");

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
    <View className="app flex-1 p-4 justify-between">
      <View className="gap-4">
        <KeyMode state={type} setState={setType} />

        <FormElement
          state={state.name}
          setState={(val: any) =>
            setState((prev) => ({ ...prev, name: val(prev.name) }))
          }
        />
        {type === "double" ? (
          <FormElement
            state={state.value}
            setState={(val: any) =>
              setState((prev) => ({ ...prev, value: val(prev.value) }))
            }
          />
        ) : null}
        <Text className="text-v-red">{err}</Text>
      </View>
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
}

function FormElement({
  state,
  setState
}: {
  state: KeyElementI;
  setState: SetStateAction<any>;
}) {
  return (
    <View className="gap-2 item p-4">
      <View className="gap-1">
        <Text>Label</Text>
        <TextInput
          value={state.label}
          onChangeText={(text) =>
            setState((prev: KeyElementI) => ({ ...prev, label: text }))
          }
          className="text-lg"
        />

        <Text>Value</Text>
        <TextInput
          value={state.value}
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
