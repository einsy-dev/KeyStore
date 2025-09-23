import * as Icons from "@/assets/icons/user";
import { useConfig } from "@/lib/providers";
import { setHeader } from "@/lib/store/app";
import { createGroup, selectData, updateGroup } from "@/lib/store/data";
import { KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { Key } from "@/shared/ui/Key";
import { useFocusEffect } from "@react-navigation/native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { GripVertical } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export default function Form_Group() {
  const data: { [id: string]: GroupI } = useSelector(selectData);
  const { groupId, icon } = useGlobalSearchParams<{ groupId: string; icon: string }>();
  const [state, setState] = useState<Optinal<GroupI, "id">>(
    groupId === "new" ? { name: "", icon: "", keys: {} } : (data[groupId] as GroupI)
  );
  const { t } = useConfig();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (icon) {
      setState((prev) => ({ ...prev, icon }));
    }
  }, [state, icon, dispatch, groupId, router]);

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

  const Icon = (Icons as { [key: string]: any })[state.icon || "Airbnb"];
  return (
    <KeyboardAvoidingView className="app flex-1 px-4 gap-2">
      <View className=" gap-2 flex-row items-center justify-center">
        <View className="">
          <Icon width={45} height={45} />
        </View>
        <TextInput
          label={t("formGroup.groupName")}
          value={state.name || ""}
          onChangeText={(text) => setState((prev: any) => ({ ...prev, name: text }))}
        />
      </View>

      {Object.keys(state.keys).length ? (
        <View className="card pe-2 pt-2 rounded">
          <DraggableFlatList
            data={Object.keys(state.keys).map((id) => ({ ...state.keys[id] }))}
            keyExtractor={(item: KeyI, index: number) => `dragable_list-${item.id}-${index} `}
            renderItem={({ item, drag }: { item: KeyI; drag: () => void }) => {
              return (
                <View className="mb-2 flex-row items-center justify-center">
                  <Pressable onPressIn={drag}>
                    <GripVertical width={30} height={30} />
                  </Pressable>
                  <Key
                    groupId={groupId}
                    data={data[groupId].keys[item.id]}
                    onPress={() =>
                      router.push({ pathname: "/(pages)/[groupId]/[keyId]", params: { groupId, keyId: item.id } })
                    }
                    onLongPress={() => null}
                  />
                </View>
              );
            }}
            onDragEnd={({ data }) => {
              setState((prev) => ({
                ...prev,
                keys: data.reduce(
                  (acc, el) => {
                    acc[el.id] = el;
                    return acc;
                  },
                  {} as { [id: string]: KeyI }
                )
              }));
            }}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}
