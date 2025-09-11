import { useColorScheme } from "nativewind";

interface useColorI {
  colorScheme: "dark" | "light" | undefined;
  setColorScheme: (scheme: "dark" | "light" | "system") => void;
  color: "black" | "white";
}

export function useColor(): useColorI {
  const { colorScheme, setColorScheme } = useColorScheme();
  return { colorScheme, setColorScheme, color: colorScheme === "dark" ? "white" : "black" };
}
