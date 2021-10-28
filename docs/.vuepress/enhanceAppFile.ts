import { createGettext } from "../../src";

import translations from "../language/translations.json";

import LanguageSelect from "./components/LanguageSelect.vue";
import LiveSnippet from "./components/LiveSnippet.vue";

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
  app.component("LiveSnippet", LiveSnippet);
};
