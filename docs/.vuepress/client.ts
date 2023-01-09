import { defineClientConfig } from "@vuepress/client";
import { createGettext } from "../../src";

import translations from "../../dev/language/translations.json";

import Demo from "../../dev/App.vue";

const gettext = createGettext({
  availableLanguages: {
    en_GB: "British English",
    fr_FR: "Français",
    it_IT: "Italiano",
    zh_CN: "简体中文",
  },
  defaultLanguage: "en_GB",
  translations: translations,
});

export default defineClientConfig({
  enhance({ app }) {
    app.use(gettext);

    app.component("Demo", Demo);
  },
});
