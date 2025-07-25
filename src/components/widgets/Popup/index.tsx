import { selectPopup, setPopup } from "@/lib/store/popup";
import { Text, View } from "@/shared";
import { ClipboardCheck } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export function Popup() {
  const { colorScheme } = useColorScheme();
  const popup = useSelector(selectPopup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (popup.active) {
      setTimeout(() => {
        dispatch(setPopup({ active: false }));
      }, 3500);
    }
  }, [popup, dispatch]);

  if (popup.active) {
    return (
      <View className="popup_v flex-row  absolute top-5 left-1/2 -translate-x-[50%]  rounded-2xl py-2  justify-around items-center w-[65%]">
        <Text className="popup_t text-2xl">{popup.message}</Text>
        <ClipboardCheck
          size={32}
          color={colorScheme === "light" ? "black" : "white"}
        />
      </View>
    );
  }
}
