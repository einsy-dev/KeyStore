import { useColorScheme } from "nativewind";

export function useColor() {
  const { colorScheme } = useColorScheme();
  return colorScheme === "dark" ? "white" : "dark";
}
