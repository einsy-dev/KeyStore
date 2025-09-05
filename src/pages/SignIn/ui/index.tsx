import { View } from "@/shared/ui";
import { delay } from "@/utils";
import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import { Numpad } from "./Numpad";
import { Pin } from "./Pin";

export function SignIn() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    auth(value).then((res) => {
      switch (res) {
        case true:
          setStatus("success");
          break;
        case false:
          setStatus("error");
          delay(() => {
            setValue("");
            setStatus(null);
          }, 400);
          break;
      }
    });
  }, [value]);

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
