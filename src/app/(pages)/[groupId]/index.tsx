import { useConfig } from "@/lib/providers";
import { createGroup, selectData, updateGroup } from "@/lib/store/data";
import { Icon, KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { HeaderFormGroup } from "@/widgets/form-group/ui/HeaderFormGroup";
import { KeyList } from "@/widgets/form-group/ui/KeysList";
import { SelectIcon } from "@/widgets/form-group/ui/select-icon/SelectIcon";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Form_Group() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const { t } = useConfig();
  const data: { [id: string]: GroupI } = useSelector(selectData);
  const [selectIconActive, setSelectIconActive] = useState(false);
  const [state, setState] = useState<Optinal<GroupI, "id">>(
    groupId === "new" ? { name: "", icon: "Airbnb", keys: {} } : (data[groupId] as GroupI)
  );

  const dispatch = useDispatch();
  function onSubmit() {
    if (!state.name || !state.icon) return;
    dispatch((groupId === "new" ? createGroup : updateGroup)(state as GroupI));
    if (groupId === "new") {
      setState((prev) => ({ ...prev, name: "", icon: "Airbnb" }));
    }
  }

  return (
    <KeyboardAvoidingView className="app flex-1 px-4 gap-2">
      <HeaderFormGroup onSubmit={onSubmit} />
      <View className=" gap-2 flex-row items-center justify-center">
        <Icon iconId={state.icon} size={45} onPressIn={() => setSelectIconActive(true)} />
        <TextInput
          label={t("formGroup.groupName")}
          value={state.name || ""}
          onChangeText={(text) => setState((prev: any) => ({ ...prev, name: text }))}
          className="flex-1"
        />
      </View>

      <KeyList groupId={groupId} data={data} state={state} setState={setState} />

      <SelectIcon
        onSelect={(id: string) => {
          setState((prev) => ({
            ...prev,
            name: prev.name === "" || prev.name === prev.icon ? id : prev.name,
            icon: id
          }));
          setSelectIconActive(false);
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }}
        active={selectIconActive}
        setActive={setSelectIconActive}
      />
    </KeyboardAvoidingView>
  );
}
