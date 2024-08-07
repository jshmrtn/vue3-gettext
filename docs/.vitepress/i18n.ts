import translations from "./language/translations.json";
import { createGettext } from "../../src";

const gettext = createGettext({
  availableLanguages: {
    en_GB: "British English",
    fr_FR: "Français",
    it_IT: "Italiano",
    zh_CN: "简体中文",
  },
  defaultLanguage: "en_GB",
  translations: translations,
  setGlobalProperties: true,
  globalProperties: {
    // custom global properties name
    gettext: ["$gettext", "__"],
    ngettext: ["$ngettext", "_n"],
    pgettext: ["$pgettext", "_x"],
    npgettext: ["$npgettext", "_xn"],
  },
});

export { gettext };
