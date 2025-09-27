import * as SecureStore from "expo-secure-store";

export async function signIn(pin: string, newPin?: boolean): Promise<{ success: boolean }> {
  const storedPin = SecureStore.getItem("pin");
  if (!storedPin || newPin) {
    SecureStore.setItem("pin", pin);
    return { success: true };
  } else if (storedPin === pin) {
    return { success: true };
  }
  return { success: false };
}
