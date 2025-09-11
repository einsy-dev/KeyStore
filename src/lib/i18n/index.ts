import { getLocales } from "expo-localization";
import { I18n, TranslateOptions } from "i18n-js";
import de from "./locales/de.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";

export const i18n = new I18n({
  en,
  ru,
  de
});

i18n.defaultLocale = deviceLanguage;
i18n.locale = deviceLanguage;

function i18(key: Paths<typeof en> & Paths<typeof ru> & Paths<typeof de>, options?: TranslateOptions) {
  return i18n.t(key, options);
}
i18("contextMenu.addGroup");

export function changeLanguage(lang: string) {
  i18n.locale = lang;
}
