import { hash } from "@/lib/crypto";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { SetStateAction, useEffect, useState } from "react";

export function useAuth(initialState: string = "", newPin: boolean = false) {
  const [value, setValue] = useState(initialState);
  const [status, setStatus] = useState<AuthStatusI>({
    success: false,
    isBioAvailbale: true
  });

  useEffect(() => {
    if (!newPin) auth(setStatus);
  }, [newPin]);

  useEffect(() => {
    // handle auth and status
    if (value.length === 4) {
      const storedPin = SecureStore.getItem("pin");
      const hashPin = hash(value);

      if (!storedPin || newPin) {
        SecureStore.setItem("pin", hashPin);
        setStatus((prev) => ({ ...prev, success: true }));
      } else {
        // eslint-disable-next-line no-unused-expressions
        storedPin === hashPin
          ? setStatus((prev) => ({ ...prev, success: true, error: "" }))
          : setStatus((prev) => ({
              ...prev,
              success: false,
              error: "incorect_password"
            }));
      }
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false, error: "" }));
        setValue("");
      }, 300);
    }
  }, [newPin, value]);

  function handleinput(callback: (prev: string) => string) {
    const res = callback(value);
    if (res.length > 4 || status.success) return;
    setValue(res);
  }

  return {
    value,
    setValue: handleinput,
    status,
    authBio: () => auth(setStatus)
  };
}

async function auth(setStatus: React.Dispatch<SetStateAction<AuthStatusI>>) {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return setStatus({ success: false, isBioAvailbale: false });
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to access the app",
    fallbackLabel: "Use passcode", // Optional: for iOS fallback
    disableDeviceFallback: true // Optional: for Android to allow device passcode fallback,
  });

  setStatus((prev) => ({ ...prev, success: result.success, error: "" }));
}
