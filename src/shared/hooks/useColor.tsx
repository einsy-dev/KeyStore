import { useColorScheme } from "nativewind";

interface useColorI {
  colorScheme: "dark" | "light" | undefined;
  color: "black" | "white";
}

export function useColor(): useColorI {
  const { colorScheme } = useColorScheme();
  return { colorScheme, color: colorScheme === "dark" ? "white" : "black" };
}
