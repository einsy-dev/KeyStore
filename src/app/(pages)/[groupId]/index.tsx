import * as Icons from "@/assets/icons";
import { setHeader } from "@/lib/store/app";
import { selectData, setGroup } from "@/lib/store/data";
import { KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { createId } from "@paralleldrive/cuid2";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Form_Group() {
  const data: DataListI = useSelector(selectData);
  const { groupId, icon } = useGlobalSearchParams<{ groupId: string; icon: string }>();
  const [state, setState] = useState<DataI>(
    groupId === "new" ? { name: "", icon: "", keys: {} } : (data[groupId] as DataI)
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useFocusEffect(() => {
    dispatch(
      setHeader({
        title: "IconsSelect",
        onSubmit: saveGroup
      })
    );
    function saveGroup() {
      if (!state.name || !state.icon) return;
      dispatch(
        setGroup({
          id: groupId === "new" ? createId() : groupId,
          data: state
        })
      );
      router.dismiss();
    }
  });

  useEffect(() => {
    if (icon) {
      setState((prev) => ({ ...prev, icon }) as DataI);
    }
  }, [state, icon, dispatch, groupId, router]);

  const Icon = (Icons as { [key: string]: any })[state.icon || "Airbnb"];
  return (
    <KeyboardAvoidingView className="app flex-1 p-4 gap-2">
      <View className="p-4 gap-2 flex-row items-center justify-center">
        <Pressable onPress={() => router.push({ pathname: "/modal/select-icon" })}>
          <View className="">
            <Icon width={45} height={45} />
          </View>
        </Pressable>
        <TextInput
          label="Group Name"
          value={state.name || ""}
          onChangeText={(text) => setState((prev: any) => ({ ...prev, name: text }))}
          className="flex-1"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
