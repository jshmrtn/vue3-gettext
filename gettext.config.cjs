/** @type {import('./src/index').GettextConfig} */
module.exports = {
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
  },
};
