import store from "@/lib/store";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

export function useConfig(): void {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    function setTheme() {
      const { config } = store.getState().config;
      if (colorScheme !== config.theme) {
        setColorScheme(config.theme);
      }
    }
    setTheme();
    const unsubscribe = store.subscribe(setTheme);
    return () => {
      unsubscribe();
    };
  }, [colorScheme, setColorScheme]);
}
