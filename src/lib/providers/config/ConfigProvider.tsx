import { i18n } from "@/lib/i18n";
import { useColor } from "@/shared/hooks";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { ReactNode, useLayoutEffect, useState } from "react";
import { ConfigContext } from "./context";

const storedConfig = JSON.parse(SecureStore.getItem("config") || "{}");
const defaultConfig: ConfigI = { theme: "system", locale: "en" };
console.log(storedConfig);
export function ConfigProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColor();
  const [state, setState] = useState<ConfigI>({ ...defaultConfig, ...storedConfig });
  const router = useRouter();

  useLayoutEffect(() => {
    if (state.theme !== colorScheme) setColorScheme(state.theme || "system");
    if (state.locale !== i18n.locale) {
      i18n.locale = state.locale;
      if (router.canGoBack()) router.setParams({});
    }

    SecureStore.setItem("config", JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function setConfig<K extends keyof ConfigI>(key: K, value: ConfigI[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  return <ConfigContext.Provider value={{ ...state, setConfig }}>{children}</ConfigContext.Provider>;
}
