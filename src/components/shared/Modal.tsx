import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from "react-native";

export function Modal({
  active,
  setActive,
  className = "",
  children
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      {active ? (
        <TouchableHighlight
          className="absolute bg-[rgba(0_0_0_0.5)] inset-0 items-center justify-center px-2"
          onPress={() => setActive(false)}
        >
          <TouchableWithoutFeedback>
            <View className={"w-full" + " " + className}>{children}</View>
          </TouchableWithoutFeedback>
        </TouchableHighlight>
      ) : null}
    </>
  );
}
