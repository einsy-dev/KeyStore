import * as Icons from "@/assets/icons";
import { selectData } from "@/lib/store/data";
import { KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Form_Group() {
  const { groupId, ...rest } = useLocalSearchParams();
  const [state, setState] = useState({ name: "" });
  const data: DataListI = useSelector(selectData);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(groupId, rest);
  }, [rest, groupId]);

  function openSelectIcon() {
    router.navigate({ pathname: "/modal/select-icon" });
  }

  return (
    <KeyboardAvoidingView className="app flex-1 p-4 gap-2">
      <View className="p-4 gap-2 flex-row items-center justify-center">
        <Pressable onPress={openSelectIcon}>
          <View className="">
            <Icons.Airbnb width={45} height={45} />
          </View>
        </Pressable>
        <TextInput
          label="Group Name"
          value={state.name}
          onChangeText={(text) => setState((prev: any) => ({ ...prev, name: text }))}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
