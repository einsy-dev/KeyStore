import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
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

export function changeLanguage(lang: string) {
  i18n.locale = lang;
}
