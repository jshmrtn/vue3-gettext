import DefaultTheme from "vitepress/theme";
import { Theme } from "vitepress";
import Demo from "../../../dev/App.vue";
import { gettext } from "../../../dev/i18n";

export default <Theme>{
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(gettext);
    app.component("Demo", Demo);
  },
};
