import { selectModal, setModal } from "@/lib/store/app";
import { useGoBack } from "@/shared/hooks";
import { useSegments } from "expo-router";
import { useEffect } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function Modal() {
  const modal: ModalI = useSelector(selectModal);
  const dispatch = useDispatch();
  const segments = useSegments();

  useEffect(() => {
    dispatch(setModal({ active: false }));
  }, [segments, dispatch]);

  useGoBack(() => {
    if (modal.active) {
      dispatch(setModal({ active: false }));
      return true;
    } else {
      return false;
    }
  });

  if (modal.active && modal.component) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setModal({ active: false }));
        }}
      >
        <View className="absolute inset-0 items-center justify-center p-8 bg-v-50">
          <TouchableWithoutFeedback
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <View className="w-full">{modal.component}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return null;
}
