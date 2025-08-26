// @ts-check
/** @type {import('./src/index').Config} */
const config = {
  input: {
    path: "./docs",
    include: [".vitepress/theme/**/*.vue", "demo.md"],
    parserOptions: {
      mapping: {
        simple: ["__"],
        plural: ["_n"],
        ctx: ["_x"],
        ctxPlural: ["_xn"],
      },
    },
  },
  output: {
    path: "./docs/.vitepress/language",
    locales: ["en_GB", "fr_FR", "zh_CN"],
    splitJson: false,
    locations: true,
  },
};

export default config;
