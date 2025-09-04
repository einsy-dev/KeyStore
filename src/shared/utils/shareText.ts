import * as Sharing from "expo-sharing";
import { Share } from "react-native";

export async function shareText(text: string) {
  if (await Sharing.isAvailableAsync()) {
    await Share.share({
      message: text
    });
  }
}
