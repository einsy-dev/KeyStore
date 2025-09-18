import { i18n, LangKeyType } from "@/lib/i18n";
import { useColor } from "@/shared/hooks";
import * as SecureStore from "expo-secure-store";
import { TranslateOptions } from "i18n-js";
import React, { ReactNode, useLayoutEffect, useState } from "react";
import { ConfigContext } from "./context";

const storedConfig = JSON.parse(SecureStore.getItem("config") || "{}");
const defaultConfig: ConfigI = { theme: "system", locale: "en" };

export function ConfigProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColor();
  const [state, setState] = useState<ConfigI>({ ...defaultConfig, ...storedConfig });

  useLayoutEffect(() => {
    if (state.theme !== colorScheme) setColorScheme(state.theme || "system");
    SecureStore.setItem("config", JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function setConfig<K extends keyof ConfigI>(key: K, value: ConfigI[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function t(key: LangKeyType, options?: TranslateOptions): string {
    i18n.locale = state.locale;
    return i18n.t(key, options);
  }

  return <ConfigContext.Provider value={{ ...state, setConfig, t }}>{children}</ConfigContext.Provider>;
}
