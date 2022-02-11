import path from "path";

import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/vue3-gettext/",
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
    navbar: [{ text: "npm", link: "https://npmjs.com/package/vue-haystack" }],
    locales: {
      "/": {
        selectLanguageName: "English",
      },
    },
    sidebar: [
      { link: "/demo.md", text: "Demo" },
      {
        text: "Setup",
        link: "/setup.md",
        children: [
          { link: "/setup.md", text: "Installation" },
          { link: "/extraction.md", text: "Message extraction" },
          { link: "/configuration.md", text: "Configuration" },
        ],
      },
      {
        text: "Usage",
        link: "/functions.md",
        children: [
          { link: "/functions.md", text: "Functions" },
          { link: "/component.md", text: "Component" },
          { link: "/directive.md", text: "Directive" },
        ],
      },
    ],
  },
});
