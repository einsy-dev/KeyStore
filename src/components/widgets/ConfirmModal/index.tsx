import { selectConfirmModal } from "@/lib/store/confirmModal";
import { setModal } from "@/lib/store/modal";
import { Modal, Pressable, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function ConfirmModal() {
  const modal: ModalI = useSelector(selectConfirmModal);
  const dispatch = useDispatch();

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
        <Text>ffeef</Text>
      </Pressable>
    </Modal>
  );
}
