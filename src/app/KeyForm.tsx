import { KeyMode } from "@/components/KeyMode";
import {
  Button,
  CheckBox,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from "@/components/shared";
import { selectData, setKey } from "@/lib/store/data";
import { createId } from "@paralleldrive/cuid2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SetStateAction, useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type LocalSearchParamI = {
  groupId: string;
  keyId: string;
};

export default function KeyGroupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { groupId, keyId } = useLocalSearchParams<LocalSearchParamI>();
  const data = useSelector(selectData);

  const [state, setState] = useState<KeyI>(
    data[groupId].keys[keyId] || { name: "", value: "" }
  );

  const [err, setErr] = useState<string>("");
  const [type, setType] = useState<KeyModeT>("double");

  function handleSubmit() {
    if (!state.name.value || (type === "double" && !state.value.value)) {
      return setErr("*Please fill all fields");
    }
    dispatch(
      setKey({
        groupId,
        keyId: keyId || createId(),
        key:
          type === "single"
            ? { ...state, value: { value: "", label: "" } }
            : state
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
    <KeyboardAvoidingView className="app flex-1">
      <View className="flex-1 p-2 gap-2">
        <ScrollView className="flex-1" contentContainerClassName="gap-2">
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
          <Text className="!text-v-red">{err}</Text>
        </ScrollView>
        <Button className="mt-auto" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
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
