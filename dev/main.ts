import { createApp, computed } from "vue";
import App from "./App.vue";
import "./index.css";
import { createGettext } from "/@gettext/";
import translations from "./language/translations.json";

const app = createApp(App);

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

app.use(gettext);

app.mount("#app");

export default app;
