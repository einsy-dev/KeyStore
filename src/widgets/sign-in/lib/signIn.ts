import { hash } from "@/lib/crypto";
import * as SecureStore from "expo-secure-store";

export async function signIn(pin: string, newPin?: boolean): Promise<{ success: boolean }> {
  const storedPin = SecureStore.getItem("pin");
  const hashPin = hash(pin);
  if (!storedPin || newPin) {
    SecureStore.setItem("pin", hashPin);
    return { success: true };
  } else if (storedPin === hashPin) {
    return { success: true };
  }
  return { success: false };
}
