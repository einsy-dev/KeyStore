import { selectModal, setModal } from "@/lib/store/app";
import { TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { View } from "../shared";

export function Modal() {
  const modal: ModalI = useSelector(selectModal);
  const dispatch = useDispatch();
  if (modal.active) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setModal({ active: false }));
        }}
      >
        <View className="absolute inset-0 w-full p-8 bg-v-50">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View className=" mt-8">{modal.component}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return null;
}
