import { selectModal, setModal } from "@/lib/store/modal";
import { Text, View } from "@/shared";
import { capitalize } from "@/utils/capitalize";
import { useEffect, useState } from "react";
import { Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface ValueI {
  [key: string]: string;
}

export function AppModal() {
  const modal: ModalI = useSelector(selectModal);
  const dispatch = useDispatch();

  const [value, setValue] = useState<ValueI>(modal.data || {});
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    if (modal.data) setValue(modal.data);
    setErr("");
  }, [modal]);

  function handleSubmit() {
    if (!validate(value, modal.required)) return setErr("Fill the form");

    modal.onSubmit!(value);

    setValue(
      Object.keys(value).reduce((acc, val) => {
        acc[val] = "";
        return acc;
      }, {} as ValueI)
    );
  }

  return (
    <Modal
      transparent
      onRequestClose={() => dispatch(setModal({ active: false }))}
      navigationBarTranslucent
      statusBarTranslucent
      visible={modal.active}
    >
      <Pressable
        onPress={() => dispatch(setModal({ active: false }))}
        className="flex-1 justify-center p-4 bg-v-50"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="p-4 border rounded-3xl overflow-hidden justify-between modal"
        >
          <View className="mb-4 justify-center">
            {Object.keys(value).map((key) => (
              <View key={key} className="gap-2 bg-p p-2">
                <Text className="text-2xl modal_t">{capitalize(key)}</Text>
                <TextInput
                  value={value[key as keyof DataI].toString()}
                  onChangeText={(text) =>
                    setValue((prev: any) => ({ ...prev, [key]: text }))
                  }
                  className="border px-4 py-2 rounded-2xl text-2xl  modal_ti"
                />
              </View>
            ))}
            <Text className="text-v-red">{err}</Text>
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <Text className="text-2xl modal_btn text-center rounded-2xl py-2">
              Submit
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function validate(
  data: { [key: string]: string },
  required?: { [key: string]: boolean }
) {
  let res = true;
  Object.keys(data).forEach((key) => {
    if (!data[key] && (!required || required[key] === true))
      return (res = false);
  });
  console.log(res);
  return res;
}
