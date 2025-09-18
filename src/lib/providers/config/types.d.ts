interface ConfigI {
  theme: "system" | "light" | "dark" | undefined;
  locale: "en" | "ru" | "ge";
}
interface ConfigContextI extends ConfigI {
  setConfig: <K extends keyof ConfigI>(key: K, value: ConfigI[K]) => void;
  t: (key: Paths<typeof en> & Paths<typeof ru> & Paths<typeof de>, options?: TranslateOptions) => string;
}
