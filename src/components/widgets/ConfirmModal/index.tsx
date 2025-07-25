import { selectConfirmModal, setConfirmModal } from "@/lib/store/confirmModal";
import { Modal, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function ConfirmModal() {
  const modal: ConfirmModalI = useSelector(selectConfirmModal);
  const dispatch = useDispatch();

  return (
    <Modal
      transparent
      onRequestClose={() => dispatch(setConfirmModal({ active: false }))}
      navigationBarTranslucent
      statusBarTranslucent
      visible={modal.active}
    >
      <Pressable
        onPress={() => dispatch(setConfirmModal({ active: false }))}
        className="flex-1 justify-center p-4 bg-v-50"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="p-4 border rounded-3xl overflow-hidden justify-between modal"
        >
          <Text className="modal_t text-2xl text-center mb-4">
            {modal.message}
          </Text>
          <View className="flex-row justify-evenly">
            {modal.options?.map((opt) => (
              <Pressable
                key={opt.text}
                onPress={() => {
                  opt.onPress();
                  dispatch(setConfirmModal({ active: false }));
                }}
              >
                <Text className="modal_t modal_btn rounded-2xl px-10 py-2">
                  {opt.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
