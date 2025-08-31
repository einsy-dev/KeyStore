import { SelectIcon } from "@/components/SelectIcon";
import {
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from "@/components/shared";
import { selectData, setGroup } from "@/lib/store/data";
import { createId } from "@paralleldrive/cuid2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SplinePointer } from "lucide-react-native";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function KeyGroupForm() {
  const data: DataListI = useSelector(selectData);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    id = createId(),
    name = "",
    icon = 0,
    order = 0
  } = useLocalSearchParams<any>();
  const [state, setState] = useState<DataI>({
    name,
    icon,
    order,
    keys: (data[id] && data[id].keys) || {}
  });
  const [err, setErr] = useState<string>("");

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
      <View className="flex-1 p-4">
        <View className="gap-2">
          <View className=" item p-4">
            <Text className="text-2xl text-center border-b border-v-light dark:border-v-red ">
              Icon
            </Text>
            <View className="items-center p-2">
              <Suspense fallback={<SplinePointer />}>
                <SelectIcon
                  defaultValue={icon}
                  itemsPerLine={6}
                  onSelect={(id) => setState((prev) => ({ ...prev, icon: id }))}
                />
              </Suspense>
            </View>
          </View>
          <View className=" item p-4">
            <View className="gap-2">
              <Text className="text-2xl text-center">Name</Text>
              <TextInput
                value={state.name}
                onChangeText={(text) =>
                  setState((prev: any) => ({ ...prev, name: text }))
                }
              />
            </View>
            <Text className="text-v-red">{err}</Text>
          </View>
        </View>
        <Button className="mt-auto" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
