import path from "path";

import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "vue3-gettext/",
  port: 8080,
  lang: "en-US",
  title: "Vue 3 Gettext",
  plugins: ["@vuepress/plugin-search"],
  bundler: "@vuepress/vite",
  bundlerConfig: {
    viteOptions: {
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
      { link: "/component.md", text: "Component: <translate>" },
      { link: "/directive.md", text: "Directive: v-translate" },
    ],
  },
});
