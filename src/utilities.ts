import { inject } from "vue";
import { GetTextOptions, GetTextSymbol, Language, LanguageData, Translations } from "./typeDefs.js";

export function normalizeTranslationKey(key: string) {
  return (
    key
      .replace(/\r?\n|\r/, "")
      // .replace(/\s\s+/g, " ")
      .trim()
  );
}

export function normalizeTranslations(translations: GetTextOptions["translations"]) {
  const newTranslations: Translations = {};
  Object.keys(translations).forEach((lang) => {
    const langData = translations[lang];
    const newLangData: LanguageData = {};
    Object.keys(langData).forEach((key) => {
      newLangData[normalizeTranslationKey(key)] = langData[key];
    });
    newTranslations[lang] = newLangData;
  });
  return newTranslations;
}

export const useGettext = (): Language => {
  const gettext = inject(GetTextSymbol, null) as Language | null;
  if (!gettext) {
    throw new Error("Failed to inject gettext. Make sure vue3-gettext is set up properly.");
  }
  return gettext;
};

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`);
  }
}
