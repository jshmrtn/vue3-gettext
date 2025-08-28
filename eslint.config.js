import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  {
    ignores: ["**/node_modules", "**/dist", "**/distDocs", "**/coverage", "docs/.vitepress/cache", "**/.vscode"],
  },
  ...pluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    rules: {},
  },
];
