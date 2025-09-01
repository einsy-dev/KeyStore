import * as LocalAuthentication from "expo-local-authentication";

export async function auth() {
  await LocalAuthentication.cancelAuthenticate();

  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    console.log("Biometric authentication not available or not set up.");
    return;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to access the app",
    fallbackLabel: "Use passcode", // Optional: for iOS fallback
    disableDeviceFallback: false // Optional: for Android to allow device passcode fallback
  });

  return result.success ? true : false;
}
