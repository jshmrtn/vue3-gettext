// Based on https://github.com/Polyconseil/easygettext/blob/master/src/compile.js

const Pofile = require("pofile");
import fsPromises from "fs/promises";
import { LanguageData, MessageContext, Translations } from "../src/typeDefs";

/**
 * Returns a sanitized po data dictionary where:
 * - no fuzzy or obsolete strings are returned
 * - no empty translations are returned
 *
 * @param poItems items from the PO catalog
 * @returns jsonData: sanitized PO data
 */
export const sanitizePoData = (poItems: InstanceType<typeof Pofile.Item>[]) => {
  const messages: LanguageData = {};

  for (let item of poItems) {
    const ctx = item.msgctxt || "";
    if (item.msgstr[0] && item.msgstr[0].length > 0 && !item.flags.fuzzy && !(item as any).obsolete) {
      if (!messages[item.msgid]) {
        messages[item.msgid] = {};
      }
      // Add an array for plural, a single string for singular.
      (messages[item.msgid] as MessageContext)[ctx] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
    }
  }

  // Strip context from messages that have no context.
  for (let key in messages) {
    if (Object.keys(messages[key]).length === 1 && (messages[key] as MessageContext)[""]) {
      messages[key] = (messages[key] as MessageContext)[""];
    }
  }

  return messages;
};

export const po2json = (poContent: string) => {
  const catalog = Pofile.parse(poContent);
  if (!catalog.headers.Language) {
    throw new Error("No Language headers found!");
  }
  return {
    headers: catalog.headers,
    messages: sanitizePoData(catalog.items),
  };
};

export const compilePoFiles = async (localesPaths: string[]) => {
  const translations: Translations = {};

  await Promise.all(
    localesPaths.map(async (lp) => {
      const fileContent = await fsPromises.readFile(lp, { encoding: "utf-8" });
      const data = po2json(fileContent);
      const lang = data.headers.Language;
      if (lang && !translations[lang]) {
        translations[lang] = data.messages;
      } else {
        Object.assign(translations[data.headers.Language!], data.messages);
      }
    }),
  );

  return translations;
};
