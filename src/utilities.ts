import { inject } from "vue";
import {
  GetTextOptions,
  GetTextSymbol,
  Language,
  LanguageData,
  LanguageDataNormalized,
  Message,
  MessageContext,
  Translations,
  TranslationsNormalized,
} from "./typeDefs";

export function normalizeTranslationKey(key: string) {
  return key
    .replace(/\r?\n|\r/, "")
    .replace(/\s\s+/g, " ")
    .trim();
}

export function normalizeTranslations(translations: GetTextOptions["translations"]) {
  const newTranslations: TranslationsNormalized = {};
  Object.keys(translations).forEach((lang) => {
    const langData = translations[lang];
    const newLangData: LanguageDataNormalized = {};
    Object.keys(langData).forEach((key) => {
      newLangData[normalizeTranslationKey(key)] = normalizeMessageData(langData[key]);
    });
    newTranslations[lang] = newLangData;
  });
  return newTranslations;
}

export function normalizeMessageData(message: Message | MessageContext): MessageContext {
  if (message instanceof Object && !Array.isArray(message)) {
    // message is already a context object
    return message;
  }
  return { "": message };
}

export const useGettext = (): Language => {
  const gettext = inject(GetTextSymbol, null) as Language | null;
  if (!gettext) {
    throw new Error("Failed to inject gettext. Make sure vue3-gettext is set up properly.");
  }
  return gettext;
};
