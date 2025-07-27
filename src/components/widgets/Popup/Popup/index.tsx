import { selectPopup, setPopup } from "@/lib/store/app";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export function Popup() {
  const popup: ModalI = useSelector(selectPopup);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<number>();

  useEffect(() => {
    if (popup.active) {
      setTimer((prev) => {
        clearTimeout(prev);
        return setTimeout(() => {
          dispatch(setPopup({ active: false }));
        }, 3500);
      });
    }
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup]);

  if (popup.active) {
    return (
      <View className="absolute w-full">
        <SafeAreaView>{popup.component}</SafeAreaView>
      </View>
    );
  }
}
