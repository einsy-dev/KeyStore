import * as Crypto from "expo-crypto";

export async function genPass({ length }: { length: number }) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;

  let password = "";
  const randomBytes = await Crypto.getRandomBytesAsync(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % allChars.length;
    password += allChars[randomIndex];
  }

  return password;
}
