import { selectPopup, setPopup } from "@/lib/store/popup";
import { Text, View } from "@/shared";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Popup() {
  const { colorScheme } = useColorScheme();
  const popup: PopupI = useSelector(selectPopup);
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
      <View className="popup_v flex-row  absolute top-1 left-1/2 -translate-x-[50%]  rounded-3xl px-2 py-4 justify-evenly items-center w-[75%]">
        <Text className="popup_t text-2xl max-w-[80%]">{popup.message}</Text>
        {popup.icon ? (
          <popup.icon
            size={32}
            color={colorScheme === "light" ? "black" : "white"}
          />
        ) : null}
      </View>
    );
  }
}
