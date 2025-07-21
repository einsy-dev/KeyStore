import { selectModal, setModal } from "@/lib/store/modal";
import { capitalize } from "@/utils/capitalize";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function AppModal() {
  const modal: ModalI = useSelector(selectModal);
  const [value, setValue] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    setValue(modal.data);
  }, [modal]);

  return (
    <Modal
      transparent
      onRequestClose={() => dispatch(setModal({ active: false }))}
      visible={modal.active}
    >
      <Pressable
        onPress={() => dispatch(setModal({ active: false }))}
        className="flex-1 justify-center p-4"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="h-1/2 p-4 bg-white border rounded-lg overflow-hidden justify-between"
        >
          <Text className="text-center text-2xl">REPLACE</Text>
          <View>
            {Object.keys(value).map((key) => (
              <View key={key} className="gap-2  p-2">
                <Text className="text-2xl">{capitalize(key)}</Text>
                <TextInput
                  value={value[key as keyof DataI].toString()}
                  onChangeText={(text) =>
                    setValue((prev: any) => ({ ...prev, [key]: text }))
                  }
                  className="border px-4 rounded text-xl"
                />
              </View>
            ))}
          </View>
          <Pressable
            onPress={() => modal.onSubmit!(value)}
            className="bg-red-400  px-4 py-2 items-center rounded-full"
          >
            <Text className="text-2xl">Submit</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
