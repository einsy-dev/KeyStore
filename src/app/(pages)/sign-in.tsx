import { useSession } from "@/hooks";
import { delay } from "@/utils";
import { Numpad, Pin } from "@/widgets/sign-in";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function SignIn() {
  const [value, setValue] = useState("");
  const { signIn, signInBio, status, isCanceled } = useSession();

  useEffect(() => {
    if (!status && !isCanceled) signInBio();
    if (status !== "error") return;
    delay(() => {
      setValue("");
    }, 300);
  }, [isCanceled, signInBio, status]);

  useEffect(() => {
    if (value.length < 4) return;
    (async () => {
      await signIn(value);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View className="app flex-1">
      <Pin value={value} status={status} />
      <Numpad
        onChangeText={setValue}
        onFingerPrint={() => signInBio()}
        disabled={status === "success" || status === "error"}
      />
    </View>
  );
}
