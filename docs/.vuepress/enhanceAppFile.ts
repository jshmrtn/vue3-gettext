import { createGettext } from "../../src";

import translations from "../language/translations.json";

import LanguageSelect from "./components/LanguageSelect.vue";

const gettext = createGettext({
  availableLanguages: {
    en: "English",
    de: "Deutsch",
  },
  defaultLanguage: "en",
  translations: translations,
});

export default ({ app }) => {
  app.use(gettext);

  app.component("LanguageSwitch", LanguageSelect);
};
