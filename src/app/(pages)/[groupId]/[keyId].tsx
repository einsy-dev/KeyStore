import { useConfig } from "@/lib/providers";
import { createKey, selectData, updateKey } from "@/lib/store/data";
import { CheckBox, KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { genPass } from "@/utils";
import { HeaderFormKey } from "@/widgets/form-key/ui/HeaderFormKey";
import { KeyMode } from "@/widgets/form-key/ui/KeyMode";
import { useLocalSearchParams } from "expo-router";
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
  const dispatch = useDispatch();
  // const { t } = useConfig();
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
    const newState: Optinal<KeyI, "id"> = {
      ...state,
      name: { ...state.name, label: state.name.label.trim(), value: state.name.value.trim() },
      value: { ...state.value, label: state.value.label.trim() || "", value: state.value.value.trim() || "" }
    };
    dispatch(
      (keyId === "new" ? createKey : updateKey)({
        groupId,
        key:
          type === "double"
            ? (newState as KeyI)
            : ({ ...newState, value: { label: "", value: "", hide: false } } as KeyI)
      })
    );
    if (keyId === "new") {
      setState((prev) => ({ ...prev, name: defaultKey, value: defaultKey }));
    }
    setErr("");
    setState((prev: any) =>
      Object.keys(prev).reduce((acc: any, el: any) => {
        acc[el] = "";
        return acc;
      }, {})
    );
  }

  return (
    <KeyboardAvoidingView className="app flex-1 p-4 gap-4">
      <HeaderFormKey onSubmit={handleSubmit} />
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
      <Text className="err">{err}</Text>
    </KeyboardAvoidingView>
  );
}

function FormElement({ state, setState }: { state: KeyNameI | KeyValueI; setState: SetStateAction<any> }) {
  const { t } = useConfig();
  return (
    <View className="gap-2">
      <View className="gap-4">
        <TextInput
          label={t("formKey.label")}
          value={state.label}
          onChangeText={(text) =>
            setState((prev: KeyNameI | KeyValueI) => ({ ...prev, label: text.replace("\n", "") }))
          }
          className="text text-lg w-full"
        />

        <TextInput
          label={t("formKey.value")}
          value={state.value}
          onChangeText={(text) =>
            setState((prev: KeyNameI | KeyValueI) => ({ ...prev, value: text.replace("\n", "") }))
          }
          className="text-lg"
        />
      </View>
      <View className="flex-row gap-4">
        <CheckBox
          checked={state.hide}
          onChange={(hide) => {
            setState((prev: KeyNameI | KeyValueI) => ({ ...prev, hide }));
          }}
        >
          {t("formKey.hide")}
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
          {t("formKey.genPassword")}
        </CheckBox>
      </View>
    </View>
  );
}
