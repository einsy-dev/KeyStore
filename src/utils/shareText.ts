import * as Sharing from "expo-sharing";
import { AppState, Share } from "react-native";

export async function shareText(text: string) {
  if (!(await Sharing.isAvailableAsync())) return;
  return new Promise((res, rej) => {
    const listener = AppState.addEventListener("focus", () => {
      res({ status: "success" });
      listener.remove();
    });
    Share.share({ message: text });
  });
}
