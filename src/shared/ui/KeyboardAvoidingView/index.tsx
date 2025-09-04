import { useEffect, useState } from "react";
import { Keyboard, ViewProps } from "react-native";
import { View } from "../View";

export function KeyboardAvoidingView({ children, ...props }: ViewProps) {
  const [keyboardStatus, setKeyboardStatus] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      const metrics = Keyboard.metrics();
      if (!metrics) return;
      setKeyboardStatus(metrics.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View {...props} style={{ paddingBottom: keyboardStatus }}>
      {children}
    </View>
  );
}
