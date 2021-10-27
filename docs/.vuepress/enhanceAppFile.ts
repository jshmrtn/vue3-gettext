import { createGettext } from "../../src";

import translations from "./language/translations.json";

import LanguageSelect from "./components/LanguageSelect.vue";
import Demo1 from "./components/Demo1.vue";

const gettext = createGettext({
  availableLanguages: {
    en_GB: "British English",
    fr_FR: "Français",
    it_IT: "Italiano",
  },
  defaultLanguage: "en_GB",
  translations: translations,
  setGlobalProperties: true,
});

export default ({ app }) => {
  app.use(gettext);

  app.component("LanguageSwitch", LanguageSelect);
  app.component("Demo1", Demo1);
};
