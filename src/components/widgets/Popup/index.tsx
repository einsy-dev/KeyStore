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
      }, 3000);
    }
  }, [popup, dispatch]);

  if (popup.active) {
    return (
      <View className="popup_v flex-row gap-4 absolute top-5 left-1/2 -translate-x-[50%]  rounded-full py-2 px-10 justify-between items-center w-[60%]">
        <Text className="popup_t ">{popup.message}</Text>
        <ClipboardCheck color={colorScheme === "light" ? "black" : "white"} />
      </View>
    );
  }
}
