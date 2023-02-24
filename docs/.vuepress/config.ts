import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import path from "node:path";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  base: "/vue3-gettext/",
  port: 8080,
  lang: "en-US",
  title: "Vue 3 Gettext",
  description: "Translate your Vue 3 applications with Gettext",
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          // vue: "vue/dist/vue.esm-bundler.js",
          "/@gettext/": path.resolve(__dirname, "../../src"),
        },
      },
    },
  }),
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Vue 3 Gettext",
      description: "使用 Gettext 国际化你的 Vue3 应用",
    },
  },
  theme: defaultTheme({
    repo: "https://github.com/jshmrtn/vue3-gettext",
    navbar: [{ text: "npm", link: "https://npmjs.com/package/vue3-gettext" }],
    locales: {
      "/": {
        selectLanguageName: "English",
      },
      "/zh/": {
        selectLanguageName: "简体中文",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdatedText: "上次更新",
        contributorsText: "贡献者",
        sidebar: [
          { link: "/zh/demo.md", text: "在线演示" },
          {
            text: "安装与设置",
            link: "/zh/setup.md",
            children: [
              { link: "/zh/setup.md", text: "安装步骤" },
              { link: "/zh/extraction.md", text: "自动抽取" },
              { link: "/zh/configuration.md", text: "插件配置" },
            ],
          },
          {
            text: "使用方法",
            link: "/zh/functions.md",
            children: [
              { link: "/zh/functions.md", text: "全局属性" },
              { link: "/zh/component.md", text: "组件(已废弃)" },
              { link: "/zh/directive.md", text: "指令(已废弃)" },
            ],
          },
          {
            text: "翻译文档说明",
            link: "/zh/translation.md",
          },
        ],
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
      {
        text: "Translation",
        link: "/translation.md",
      },
    ],
  }),
});
