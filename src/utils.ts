import { GetTextOptions } from ".";

export function normalizeTranslationKey(key: string) {
  return key
    .replace(/\r?\n|\r/, "")
    .replace(/\s\s+/g, " ")
    .trim();
}

export function normalizeTranslations(translations: GetTextOptions["translations"]) {
  const newTranslations = {};
  Object.keys(translations).forEach((lang) => {
    const langData = translations[lang];
    const newLangData = {};
    Object.keys(langData).forEach((key) => {
      newLangData[normalizeTranslationKey(key)] = langData[key];
    });
    newTranslations[lang] = newLangData;
  });
  return newTranslations;
}
