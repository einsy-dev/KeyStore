import { useSession } from "@/hooks";
import { View } from "@/shared/ui";
import { delay } from "@/utils";
import { useEffect, useState } from "react";
import { auth } from "./lib/auth";
import { Numpad } from "./ui/Numpad";
import { Pin } from "./ui/Pin";

export function SignIn() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const { signIn } = useSession();

  useEffect(() => {
    auth(value).then((res) => {
      switch (res) {
        case true:
          setStatus("success");
          delay(() => signIn(), 300);
          break;
        case false:
          setStatus("error");
          delay(() => {
            setValue("");
            setStatus(null);
          }, 300);
          break;
      }
    });
  }, [signIn, value]);

  return (
    <View className="flex-1">
      <Pin value={value} status={status} />
      <Numpad
        onChangeText={setValue}
        onFingerPrint={() => null}
        disabled={status === "success" || status === "error"}
      />
    </View>
  );
}
