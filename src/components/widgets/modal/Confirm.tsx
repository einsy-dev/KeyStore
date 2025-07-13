import { Modal, Text, View } from "react-native";

interface ConfirmI {
  onConfirm: () => void;
  onReject: () => void;
}
export function Confirm({ onConfirm, onReject }: ConfirmI) {
  return (
    <Modal>
      <View>
        <Text>Confirm?</Text>
      </View>
    </Modal>
  );
}
