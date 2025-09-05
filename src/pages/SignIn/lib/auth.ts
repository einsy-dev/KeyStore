import { hash } from "@/lib/crypto";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

interface OptionsI {
  newPin: boolean;
}

const defaultOptions: OptionsI = {
  newPin: false
};

export async function auth(pin: string, options: OptionsI = defaultOptions): Promise<boolean | undefined> {
  if (pin.length !== 4) return;
  const storedPin = SecureStore.getItem("pin");
  const hashPin = hash(pin);

  if (!storedPin || options.newPin) {
    SecureStore.setItem("pin", hashPin);
    return true;
  } else {
    return storedPin === hashPin;
  }
}

export async function authBio() {
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

  return { success: result.success, error: result.success ? "" : result.error };
}
