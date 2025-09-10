import * as Icons from "@/assets/icons";
import { setHeader } from "@/lib/store/app";
import { createGroup, selectData, updateGroup } from "@/lib/store/data";
import { KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { parseIcons, RenderItem } from "@/widgets/select-icon";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Form_Group() {
  const data = useSelector(selectData);
  const { groupId, icon } = useGlobalSearchParams<{ groupId: string; icon: string }>();
  const [state, setState] = useState<Optinal<GroupI, "id">>(
    groupId === "new" ? { name: "", icon: "", keys: {} } : (data[groupId] as GroupI)
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
      dispatch((groupId === "new" ? createGroup : updateGroup)(state as GroupI));
      router.dismiss();
    }
  });

  useEffect(() => {
    if (icon) {
      setState((prev) => ({ ...prev, icon }));
    }
  }, [state, icon, dispatch, groupId, router]);

  const Icon = (Icons as { [key: string]: any })[state.icon || "Airbnb"];
  return (
    <KeyboardAvoidingView className="app flex-1 p-8 gap-2">
      <View className="card h-[270px] rounded-xl p-2">
        <FlatList
          data={parseIcons(Icons, 6)}
          keyExtractor={(item: { name: string; Icon: IconI }[]) => item[0].name}
          renderItem={RenderItem(state.icon, (newIcon: string) => setState((prev) => ({ ...prev, icon: newIcon })), 40)}
          extraData={state.icon}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className=" gap-2 flex-row items-center justify-center">
        <View className="">
          <Icon width={45} height={45} />
        </View>
        <TextInput
          label="Group Name"
          value={state.name || ""}
          onChangeText={(text) => setState((prev: any) => ({ ...prev, name: text }))}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
