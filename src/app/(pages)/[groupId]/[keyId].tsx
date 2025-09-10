import { setHeader } from "@/lib/store/app";
import { createKey, selectData, updateKey } from "@/lib/store/data";
import { CheckBox, KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { genPass } from "@/utils";
import { KeyMode } from "@/widgets/form-key/ui/KeyMode";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SetStateAction, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type LocalSearchParamI = {
  groupId: string;
  keyId: string;
};
const defaultKey: KeyNameI | KeyValueI = {
  label: "",
  value: "",
  hide: false
};

export default function KeyGroupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { groupId, keyId } = useLocalSearchParams<LocalSearchParamI>();
  const data = useSelector(selectData);
  const [state, setState] = useState<Optinal<KeyI, "id">>(
    keyId === "new" ? { name: defaultKey, value: defaultKey } : data[groupId].keys[keyId]
  );
  const [err, setErr] = useState<string>("");
  const [type, setType] = useState<KeyModeT>("double");

  function handleSubmit() {
    if (!state.name.value || (type === "double" && !state.value.value)) {
      return setErr("*Please fill all fields");
    }
    dispatch((keyId === "new" ? createKey : updateKey)({ groupId, key: state as KeyI }));
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

function FormElement({ state, setState }: { state: KeyNameI | KeyValueI; setState: SetStateAction<any> }) {
  return (
    <View className="gap-2">
      <View className="gap-4">
        <TextInput
          label="Label"
          value={state.label}
          onChangeText={(text) => setState((prev: KeyNameI | KeyValueI) => ({ ...prev, label: text }))}
          className="text text-lg"
        />

        <TextInput
          label="Value"
          value={state.value}
          onChangeText={(text) => setState((prev: KeyNameI | KeyValueI) => ({ ...prev, value: text }))}
          className="text-lg"
        />
      </View>
      <View className="flex-row gap-4">
        <CheckBox
          onChange={(hide) => {
            setState((prev: KeyNameI | KeyValueI) => ({ ...prev, hide }));
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
              (prev: KeyNameI | KeyValueI) =>
                ({
                  ...prev,
                  value
                }) as KeyNameI | KeyValueI
            );
          }}
        >
          GenPass
        </CheckBox>
      </View>
    </View>
  );
}
