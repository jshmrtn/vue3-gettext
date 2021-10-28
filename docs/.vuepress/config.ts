import path from "path";

import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";
import vueLifeMarkdownPlugin from "./vueLifeMarkdownPlugin";

const htmlPlugin = {
  name: "vite-html",
  transform(code, id) {
    if (!id.endsWith(".html")) {
      return;
    }
    return `export default ${JSON.stringify(code)}`;
  },
};

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",
  port: 8080,
  lang: "en-US",
  title: "Vue 3 Gettext",
  plugins: ["@vuepress/plugin-search", vueLifeMarkdownPlugin],
  bundler: "@vuepress/vite",
  bundlerConfig: {
    viteOptions: {
      plugins: [htmlPlugin],
      resolve: {
        alias: {
          vue: "vue/dist/vue.esm-bundler.js",
          "/@gettext/": path.resolve(__dirname, "../../src"),
        },
      },
    },
  },
  clientAppEnhanceFiles: [path.resolve(__dirname, "./enhanceAppFile.ts")],
  themeConfig: {
    repo: "https://github.com/jshmrtn/vue3-gettext",
    navbar: [],
    locales: {
      "/": {
        selectLanguageName: "English",
      },
    },
    sidebar: [
      { link: "/setup.md", text: "Setup" },
      { link: "/component.md", text: "<translate>" },
      { link: "/directive.md", text: "v-translate" },
    ],
  },
});
