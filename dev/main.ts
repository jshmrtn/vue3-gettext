import { createApp } from "vue";
import App from "./App.vue";
import { gettext } from "./i18n";

const app = createApp(App);


app.use(gettext);

app.mount("#app");

export default app;
