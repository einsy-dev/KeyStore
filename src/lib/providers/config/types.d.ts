interface ConfigI {
  theme: "system" | "light" | "dark" | undefined;
  locale: "en" | "ru" | "ge";
}
interface ConfigContextI extends ConfigI {
  setConfig: <K extends keyof ConfigI>(key: K, value: ConfigI[K]) => void;
}
