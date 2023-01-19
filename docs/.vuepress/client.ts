import { defineClientConfig } from "@vuepress/client";
import Demo from "../../dev/App.vue";
import { gettext } from "../../dev/i18n";

export default defineClientConfig({
  enhance({ app }) {
    app.use(gettext);

    app.component("Demo", Demo);
  },
});
