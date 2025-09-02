import * as LocalAuthentication from "expo-local-authentication";
import { LocalAuthenticationResult } from "expo-local-authentication";
import { useEffect, useState } from "react";

export function useBioAuth() {
  const [status, setStatus] = useState<LocalAuthenticationResult | null>(null);

  useEffect(() => {
    setTimeout(() => {
      auth().then(setStatus);
    }, 500);
  }, []);

  return status?.success ? "success" : "error";
}

async function auth() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    throw new Error("no hardware or no enrolled");
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to access the app",
    fallbackLabel: "Use passcode", // Optional: for iOS fallback
    disableDeviceFallback: true // Optional: for Android to allow device passcode fallback,
  });

  return result;
}
