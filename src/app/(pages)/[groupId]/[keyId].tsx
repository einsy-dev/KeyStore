import { useConfig } from "@/lib/providers";
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
    dispatch(
      (keyId === "new" ? createKey : updateKey)({
        groupId,
        key: type === "double" ? (state as KeyI) : ({ ...state, value: { label: "", value: "", hide: false } } as KeyI)
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
          onChangeText={(text) => setState((prev: KeyNameI | KeyValueI) => ({ ...prev, label: text }))}
          className="text text-lg w-full"
        />

        <TextInput
          label={t("formKey.value")}
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
