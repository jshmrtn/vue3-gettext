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
  plugins: [/*"@vuepress/plugin-search" */ vueLifeMarkdownPlugin],
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
    // configureWebpack: (_config: WebpackConfiguration, _isServer: boolean, _isBuild: boolean) => ({
    //   resolve: {
    //     alias: {
    //       "@": path.join(__dirname, "../../../src"),
    //       "@kili": path.join(__dirname, "../../src"),
    //       vue: "vue/dist/vue.esm-bundler.js",
    //     },
    //   },
    // }),
    // scss: {
    //   additionalData: `@use "@kili/styles/variables" as *;
    //       @use "@kili/styles/mixins" as *;`,
    // },
    // chainWebpack: (config) => {
    //   config.module
    //     .rule("vue")
    //     .use("vue-loader")
    //     .tap((options) => {
    //       options.compilerOptions = {
    //         // TODO: custom directives break build
    //         directiveTransforms: {
    //           "click-outside": () => ({
    //             props: [],
    //           }),
    //           maska: () => ({
    //             props: [],
    //           }),
    //           tab: () => ({
    //             props: [],
    //           }),
    //           translate: () => ({
    //             props: [],
    //           }),
    //         },
    //       };
    //       return options;
    //     });
    //   const svgRule = config.module.rule("svg");
    //   svgRule.uses.clear().end();
    //   svgRule
    //     .oneOf("url")
    //     .resourceQuery(/url/)
    //     .use("babel-loader")
    //     .loader("babel-loader")
    //     .end()
    //     .use("svg-url-loader")
    //     .loader("svg-url-loader")
    //     .end();
    //   svgRule
    //     .oneOf("inline")
    //     .use("vue-loader")
    //     .loader("vue-loader")
    //     .end()
    //     .use("vue-svg-loader")
    //     .loader("vue-svg-loader")
    //     .end();
    // },
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
      {
        text: "Infos",
        children: [{ link: "/README.md", text: "Guidelines" }],
      },
      { link: "/COMPONENT.md", text: "<translate>" },
      { link: "/DIRECTIVE.md", text: "v-translate" },
      // {
      //   text: "Styles",
      //   children: [
      //     { link: "/TYPO.md", text: "Typography" },
      //     { link: "/STYLES.md", text: "Styles" },
      //     { link: "/STYLES_GRID.md", text: "Row - Grid" },
      //     { link: "/GRID.md", text: "Grid" },
      //   ],
      // },
      // {
      //   text: "Components",
      //   children: [
      //     { link: "/ACCORDION.md", text: "Accordion" },
      //     { link: "/ACTIONMENU.md", text: "ActionMenu" },
      //     { link: "/ACTIONMENUITEM.md", text: "ActionMenuItem" },
      //     { link: "/BAR_CHART.md", text: "BarChart" },
      //     { link: "/BUTTON.md", text: "Button" },
      //     { link: "/CALENDAR.md", text: "Calendar" },
      //     { link: "/CARD.md", text: "Card" },
      //     { link: "/CHECKBOX.md", text: "Checkbox" },
      //     { link: "/COLLAPSABLE.md", text: "Collapsable" },
      //     { link: "/DONUTCHART.md", text: "DonutChart" },
      //     { link: "/DIALOGSERVICE.md", text: "DialogService" },
      //     { link: "/DROPDOWN.md", text: "Dropdown" },
      //     { link: "/EXPANDABLE_LAYOUT.md", text: "ExpandableLayout" },
      //     { link: "/FORMFIELD.md", text: "FormField" },
      //     { link: "/INPUT_TEXT.md", text: "InputText" },
      //     { link: "/INPUT_TEXTAREA.md", text: "InputTextarea" },
      //     { link: "/INPUT_DATE.md", text: "InputDate" },
      //     { link: "/INPUT_DATETIME.md", text: "InputDatetime" },
      //     { link: "/INPUT_NUMBER.md", text: "InputNumber" },
      //     { link: "/INPUT_CURRENCY.md", text: "InputCurrency" },
      //     { link: "/INPUT_DROPDOWN.md", text: "InputDropdown" },
      //     { link: "/INPUT_MULTISELECT_DROPDOWN.md", text: "InputMultiselectDropdown" },
      //     { link: "/INPUT_SEARCH.md", text: "InputSearch" },
      //     { link: "/INPUT_SVN.md", text: "InputSvn" },
      //     { link: "/INPUT_TOGGLE.md", text: "InputToggle" },
      //     { link: "/INPUT_DYNAMIC_SEARCH.md", text: "InputDynamicSearch" },
      //     { link: "/ICON.md", text: "Icon" },
      //     { link: "/LIST.md", text: "List" },
      //     { link: "/RADIO.md", text: "Radio" },
      //     { link: "/SPINNER.md", text: "Spinner" },
      //     { link: "/TABS.md", text: "Tabs" },
      //     {
      //       text: "Table",
      //       link: "/TABLE.md",
      //       children: [
      //         { link: "/TABLE.md", text: "Table" },
      //         { link: "/TABLE_CLIENTSIDE.md", text: "TableClientside" },
      //       ],
      //     },
      //     { link: "/TREE_TABLE.md", text: "TreeTable" },
      //     { link: "/UPLOAD.md", text: "Upload" },
      //   ],
      // },
      // {
      //   text: "Layouts",
      //   children: [
      //     { link: "/LAYOUT_CONTENT.md", text: "Layout Content" },
      //     { link: "/MAINSIDEBARLAYOUT.md", text: "MainSidebarLayout" },
      //     { link: "/TABMAINSIDEBARLAYOUT.md", text: "TabMainSidebarLayout" },
      //   ],
      // },
    ],
  },
});
