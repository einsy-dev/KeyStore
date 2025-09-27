import { useSession } from "@/lib/providers";
import { delay } from "@/utils";
import { Numpad, Pin } from "@/widgets/sign-in";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function SignIn() {
  const [value, setValue] = useState("");
  const { signIn, signInBio, status, isCanceled } = useSession();
  const [newPin, setNewPin] = useState(false);

  useEffect(() => {
    const pin = SecureStore.getItem("pin");
    if (!pin) setNewPin(true);
    if (!status && !isCanceled && pin) signInBio();
    if (status !== "error") return;
    delay(() => {
      setValue("");
    }, 500);
  }, [isCanceled, signInBio, status]);

  useEffect(() => {
    if (value.length < 4) return;
    delay(() => signIn(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View className="app flex-1">
      <Pin value={value} status={status} />
      <Numpad
        onChangeText={setValue}
        onFingerPrint={!newPin && (() => signInBio())}
        disabled={status === "success" || status === "error"}
      />
    </View>
  );
}
