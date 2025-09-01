import * as LocalAuthentication from "expo-local-authentication";

export async function authenticateWithBiometrics() {
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

  if (result.success) {
    return true;
  } else {
    return false;
  }
}
