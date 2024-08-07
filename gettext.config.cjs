/** @type {import('./src/index').GettextConfig} */
module.exports = {
  input: {
    path: "./docs",
    include: [".vitepress/theme/**/*.vue", "demo.md"],
    parserOptions: {
      mapping: {
        simple: ["__"],
        plural: ["_n"],
        ctxPlural: ["_xn"],
        ctx: ["_x"],
      },
    },
  },
  output: {
    path: "./docs/.vitepress/language",
    locales: ["en_GB", "fr_FR", "it_IT", "zh_CN"],
    splitJson: false,
  },
};
