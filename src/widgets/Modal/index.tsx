import { selectModal, setModal } from "@/lib/store/app";
import { View } from "@/shared/ui";
import { useSegments } from "expo-router";
import { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function Modal() {
  const modal: ModalI = useSelector(selectModal);
  const dispatch = useDispatch();
  const segments = useSegments();

  useEffect(() => {
    dispatch(setModal({ active: false }));
  }, [segments, dispatch]);

  if (modal.active) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setModal({ active: false }));
        }}
      >
        <View className="absolute inset-0 w-full p-8 bg-v-50">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>{modal.component}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return null;
}
