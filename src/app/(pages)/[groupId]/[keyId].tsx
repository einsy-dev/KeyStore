import { setHeader } from "@/lib/store/app";
import { selectData, setKey } from "@/lib/store/data";
import { CheckBox, KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { genPass } from "@/utils";
import { KeyMode } from "@/widgets/form-key/ui/KeyMode";
import { createId } from "@paralleldrive/cuid2";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SetStateAction, useState } from "react";
import { Text, View } from "react-native";
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
    keyId !== "new" ? (data[groupId].keys[keyId] as any) : { name: "", value: "" }
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
        keyId: keyId !== "new" ? keyId : createId(),
        key: type === "single" ? { ...state, value: { value: "", label: "" } } : state
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

  useFocusEffect(() => {
    dispatch(setHeader({ title: "", onSubmit: handleSubmit }));
  });

  return (
    <KeyboardAvoidingView className="app flex-1 p-4 gap-4">
      <KeyMode state={type} setState={setType} />
      <FormElement
        state={state.name}
        setState={(val: any) => setState((prev) => ({ ...prev, name: val(prev.name) }))}
      />
      {type === "double" ? (
        <FormElement
          state={state.value}
          setState={(val: any) => setState((prev) => ({ ...prev, value: val(prev.value) }))}
        />
      ) : null}
      <Text className="!text-v-red">{err}</Text>
    </KeyboardAvoidingView>
  );
}

function FormElement({ state, setState }: { state: KeyElementI; setState: SetStateAction<any> }) {
  return (
    <View className="gap-2">
      <View className="gap-4">
        <TextInput
          label="Label"
          value={state.label}
          onChangeText={(text) => setState((prev: KeyElementI) => ({ ...prev, label: text }))}
          className="text text-lg"
        />

        <TextInput
          label="Value"
          value={state.value}
          onChangeText={(text) => setState((prev: KeyElementI) => ({ ...prev, value: text }))}
          className="text-lg"
        />
      </View>
      <View className="flex-row gap-4">
        <CheckBox
          onChange={(hide) => {
            setState((prev: KeyElementI) => ({ ...prev, hide }));
          }}
        >
          Hide
        </CheckBox>
        <CheckBox
          onChange={async (gen) => {
            let value = "";
            if (gen) {
              value = await genPass({ length: 15 });
            }
            setState(
              (prev: KeyElementI) =>
                ({
                  ...prev,
                  value
                }) as KeyElementI
            );
          }}
        >
          GenPass
        </CheckBox>
      </View>
    </View>
  );
}
