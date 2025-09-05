import { useColor } from "@/hooks";
import { selectData, setGroup } from "@/lib/store/data";
import { KeyboardAvoidingView, Text, TextInput, View } from "@/shared/ui";
import { createId } from "@paralleldrive/cuid2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function KeyGroupForm() {
  const data: DataListI = useSelector(selectData);
  const dispatch = useDispatch();
  const router = useRouter();

  const { id = createId(), name = "", icon = 0, order = 0 } = useLocalSearchParams<any>();
  const [state, setState] = useState<DataI>({
    name,
    icon,
    order,
    keys: (data[id] && data[id].keys) || {}
  });
  const [err, setErr] = useState<string>("");
  const color = useColor();
  function handleSubmit() {
    if (!state.name) {
      return setErr("Please fill all fields");
    }
    dispatch(
      setGroup({
        id,
        data: state
      })
    );
    setErr("");
    setState((prev: any) =>
      Object.keys(prev).reduce((acc: any, el: any) => {
        acc[el] = "";
        return acc;
      }, {})
    );
    router.back();
  }

  return (
    <KeyboardAvoidingView className="app flex-1">
      <View className="bg-v-dark flex-row justify-between items-center px-4">
        <Pressable onPress={() => router.back()}>
          <View className="p-2">
            <ChevronLeft color={color.iconColor} size={30} />
          </View>
        </Pressable>
        <Pressable onPress={handleSubmit}>
          <View className="p-2">
            <Check color={color.iconColor} size={30} />
          </View>
        </Pressable>
      </View>
      <View className="flex-1 p-4 gap-2">
        <View className="gap-2">
          <View className=" item p-4">
            <Text className="text-2xl text-center mb-1">Select icon</Text>
            <View className="items-center">
              {/* <SelectIcon
                defaultValue={icon}
                itemsPerLine={6}
                onSelect={(id) => setState((prev) => ({ ...prev, icon: id }))}
                className="border rounded-xl"
                contentContainerClassName="p-2"
              /> */}
            </View>
          </View>
          <View className=" item p-4">
            <View className="gap-2">
              <Text className="text-2xl text-center">Name group</Text>
              <TextInput
                value={state.name}
                onChangeText={(text) => setState((prev: any) => ({ ...prev, name: text }))}
              />
            </View>
            <Text className="text-v-red">{err}</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
