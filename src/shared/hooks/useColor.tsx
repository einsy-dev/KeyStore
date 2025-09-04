import { useColorScheme } from "nativewind";

interface useColorI {
  textColor: "white" | "black";
  iconColor: "white" | "black";
  backgroundColor: "white" | "black";
  statusBarColor: "light" | "dark";
  borderColor: "white" | "black";
  success: "green";
  error: "red";
}

export function useColor(): useColorI {
  const { colorScheme } = useColorScheme();

  if (colorScheme === "dark") {
    return {
      success: "green",
      error: "red",
      textColor: "white",
      iconColor: "white",
      backgroundColor: "black",
      statusBarColor: "light",
      borderColor: "white"
    };
  } else {
    return {
      success: "green",
      error: "red",
      textColor: "black",
      iconColor: "black",
      backgroundColor: "white",
      statusBarColor: "dark",
      borderColor: "black"
    };
  }
}
