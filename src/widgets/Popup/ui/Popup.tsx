import { selectPopup, setPopup } from "@/lib/store/app";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export function Popup() {
  const popup: ModalI = useSelector(selectPopup);
  const dispatch = useDispatch();
  const ref = useRef<number>(null);

  useEffect(() => {
    if (popup.active) {
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(async () => {
        dispatch(setPopup({ active: false }));
      }, 3000);
    }
    return () => {
      if (ref.current) clearTimeout(ref.current);
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
