import { hash } from "@/lib/crypto";
import { usePathname } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useAuth(initialState: string = "", newPin: boolean = false) {
  const [value, setValue] = useState(initialState);
  const [status, setStatus] = useState<StatusT>(null);
  const pathname = usePathname();

  useEffect(() => {
    // clear on navigate to new screen
    setValue("");
    setStatus(null);
  }, [pathname]);

  useEffect(() => {
    // handle err behavior
    if (status !== "error") return;
    const timer = setTimeout(() => {
      setValue("");
      setStatus(null);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  useEffect(() => {
    // handle auth and status
    if (value.length === 4) {
      const storedPin = SecureStore.getItem("pin");
      const hashPin = hash(value);

      if (!storedPin || newPin) {
        SecureStore.setItem("pin", hashPin);
        setStatus("success");
      } else {
        // eslint-disable-next-line no-unused-expressions
        storedPin === hashPin ? setStatus("success") : setStatus("error");
      }
    }
  }, [newPin, value]);

  function handleinput(callback: (prev: string) => string) {
    const res = callback(value);
    if (res.length > 4 || status === "success") return;
    setValue(res);
  }

  return { value, setValue: handleinput, status };
}
