import * as LocalAuthentication from "expo-local-authentication";

export async function signInBio() {
  await LocalAuthentication.cancelAuthenticate();

  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return { success: false, isBioAvailable: false };
  }
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to access the app",
    fallbackLabel: "Use passcode", // Optional: for iOS fallback
    disableDeviceFallback: true // Optional: for Android to allow device passcode fallback,
  });

  return {
    success: result.success,
    isBioAvailable: true,
    isCanceled: !result.success && (result.error === "user_cancel" || result.error === "app_cancel")
  };
}
