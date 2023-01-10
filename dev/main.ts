import { createApp } from "vue";
import App from "./App.vue";
import translations from "./language/translations.json";
import { createGettext } from "/@gettext/";

const app = createApp(App);

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
});

app.use(gettext);

app.mount("#app");

export default app;
