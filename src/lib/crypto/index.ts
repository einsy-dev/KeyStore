import { AES, HmacSHA256, SHA256, enc } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

const cache: { [key: string]: string } = {};

export function hash(text: string) {
  if (!cache[text]) {
    cache[text] = Base64.stringify(
      HmacSHA256(SHA256(text), process.env.EXPO_PUBLIC_SECRET!)
    );
  }
  return cache[text] as string;
}

export function encrypt(text: string, passPhrase: string): string {
  if (!cache[text]) {
    cache[text] = AES.encrypt(
      text,
      process.env.EXPO_PUBLIC_SECRET! + passPhrase
    ).toString();
  }
  return cache[text] as string;
}

export function decrypt(hash: string, passPhrase: string) {
  if (!cache[hash]) {
    cache[hash] = AES.decrypt(
      hash,
      process.env.EXPO_PUBLIC_SECRET! + passPhrase
    ).toString(enc.Utf8);
  }
  return cache[hash];
}
