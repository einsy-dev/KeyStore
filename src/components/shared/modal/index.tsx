import { selectModal, setModal } from "@/lib/store/app";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function Modal() {
  const modal: ModalI = useSelector(selectModal);
  const dispatch = useDispatch();

  if (modal.active) {
    return (
      <Pressable
        onPress={() => dispatch(setModal({ active: false }))}
        className="absolute inset-0 bg-v-50"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          className={`flex-1 p-4 ${modal.position === "center" ? "justify-center" : modal.position === "top" ? "justify-start" : "justify-end"}`}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            {modal.component}
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    );
  }
  return null;
}
