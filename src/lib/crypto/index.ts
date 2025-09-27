import { AES, enc } from "crypto-js";

export function encrypt(text: string, passPhrase: string): string {
  return AES.encrypt(text, passPhrase).toString();
}

export function decrypt(hash: string, passPhrase: string) {
  return AES.decrypt(hash, passPhrase).toString(enc.Utf8);
}
