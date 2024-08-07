import DefaultTheme from "vitepress/theme";
import { Theme } from "vitepress";
import { gettext } from "../i18n";

export default <Theme>{
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(gettext);
  },
};
