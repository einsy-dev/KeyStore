import { AES, HmacSHA256, SHA256, enc } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

export function hash(text: string) {
  return Base64.stringify(HmacSHA256(SHA256(text), process.env.EXPO_PUBLIC_SECRET!));
}

export function encrypt(text: string, passPhrase: string): string {
  return AES.encrypt(text, process.env.EXPO_PUBLIC_SECRET + passPhrase).toString();
}

export function decrypt(hash: string, passPhrase: string) {
  return AES.decrypt(hash, process.env.EXPO_PUBLIC_SECRET! + passPhrase).toString(enc.Utf8);
}
