import { selectPopup, setPopup } from "@/lib/store/app";
import { Text } from "@/shared";
import { useEffect, useState } from "react";
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
      <SafeAreaView className="absolute inset-0 bg-v-50">
        <Text>ewgwegewgewg</Text>
      </SafeAreaView>
    );
  }
  return null;
}
