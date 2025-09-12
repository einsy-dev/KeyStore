import { createContext } from "react";

export const ConfigContext = createContext<ConfigContextI>({
  theme: undefined,
  locale: "en",
  setConfig: function <K extends keyof ConfigI>(key: K, value: ConfigI[K]): void {
    throw new Error("Function not implemented.");
  }
});
