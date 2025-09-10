import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "nativewind";
import { useLayoutEffect, useState } from "react";

type ConfigI = {
  theme: "light" | "dark" | "system";
};

export function useConfig() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [config, setConfig] = useState<Partial<ConfigI>>(JSON.parse(SecureStore.getItem("config") || "{}"));

  useLayoutEffect(() => {
    if (config.theme && config.theme !== colorScheme) setColorScheme(config.theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  function set<V extends keyof ConfigI>(key: V, value: ConfigI[V]) {
    setConfig((prev: Partial<ConfigI>) => {
      const newConfig = { ...prev, [key]: value };
      SecureStore.setItem("config", JSON.stringify(newConfig));
      return newConfig;
    });
  }

  return { set };
}
