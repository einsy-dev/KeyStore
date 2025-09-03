import { hash } from "@/lib/crypto";
import { selectAuth, setAuth } from "@/lib/store/auth";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAuth(initialState: string = "", newPin: boolean = false) {
  const [value, setValue] = useState(initialState);
  const status = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuth({ success: false }));
    if (!newPin) auth().then((res) => dispatch(setAuth(res)));
  }, [dispatch, newPin]);

  useEffect(() => {
    // handle auth and status
    if (value.length === 4) {
      const storedPin = SecureStore.getItem("pin");
      const hashPin = hash(value);

      if (!storedPin || newPin) {
        SecureStore.setItem("pin", hashPin);
        dispatch(setAuth({ success: true }));
      } else {
        // eslint-disable-next-line no-unused-expressions
        storedPin === hashPin
          ? dispatch(setAuth({ success: true }))
          : dispatch(setAuth({ success: false, error: "incorect_password" }));
      }
      setTimeout(() => {
        dispatch(setAuth({ success: false }));
        setValue("");
      }, 300);
    }
  }, [dispatch, newPin, value]);

  function handleinput(callback: (prev: string) => string) {
    const res = callback(value);
    if (res.length > 4 || status.success) return;
    setValue(res);
  }

  return {
    value,
    setValue: handleinput,
    status,
    authBio: () => auth().then((res) => dispatch(setAuth(res)))
  };
}

async function auth() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return { success: false, isBioAvailbale: false };
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to access the app",
    fallbackLabel: "Use passcode", // Optional: for iOS fallback
    disableDeviceFallback: true // Optional: for Android to allow device passcode fallback,
  });

  return { success: result.success };
}
