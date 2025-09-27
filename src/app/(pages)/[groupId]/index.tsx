import { useConfig } from "@/lib/providers";
import { setHeader } from "@/lib/store/app";
import { createGroup, selectData, updateGroup } from "@/lib/store/data";
import { useColor } from "@/shared/hooks";
import { Icon, KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { KeyList } from "@/widgets/form-group/ui/KeysList";
import { SelectIcon } from "@/widgets/form-group/ui/select-icon/SelectIcon";
import { useFocusEffect } from "@react-navigation/native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Form_Group() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const { t } = useConfig();
  const router = useRouter();
  const data: { [id: string]: GroupI } = useSelector(selectData);
  const dispatch = useDispatch();
  const [selectIconActive, setSelectIconActive] = useState(false);
  const { color } = useColor();
  const [state, setState] = useState<Optinal<GroupI, "id">>(
    groupId === "new" ? { name: "", icon: "", keys: {} } : (data[groupId] as GroupI)
  );

  useFocusEffect(() => {
    dispatch(
      setHeader({
        active: true,
        onBack: () => {
          router.back();
        },
        onSubmit: () => {
          if (!state.name || !state.icon) return;
          dispatch((groupId === "new" ? createGroup : updateGroup)(state as GroupI));
          router.dismiss();
        }
      })
    );
  });

  return (
    <KeyboardAvoidingView className="app flex-1 px-4 gap-2">
      <View className=" gap-2 flex-row items-center justify-center">
        <Icon iconId={state.icon || "Airbnb"} size={45} onPressIn={() => setSelectIconActive(true)} />
        <TextInput
          label={t("formGroup.groupName")}
          value={state.name || ""}
          onChangeText={(text) => setState((prev: any) => ({ ...prev, name: text }))}
          className="flex-1"
        />
      </View>

      <KeyList groupId={groupId} data={data} state={state} setState={setState} />

      <Link href={{ pathname: "/(pages)/[groupId]/[keyId]", params: { groupId, keyId: "new" } }} className="mx-auto">
        <View className="flex flex-col items-center">
          <CirclePlus color={color} />
          <Text className="text">Add key</Text>
        </View>
      </Link>
      
      <SelectIcon
        onSelect={(id: string) => {
          setState((prev) => ({ ...prev, icon: id }));
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
