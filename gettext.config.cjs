/** @type {import('vue3-gettext').GettextConfig} */
module.exports = {
  input: {
    path: "./dev",
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
    path: "./dev/language",
    locales: ["en_GB", "fr_FR", "it_IT", "zh_CN"],
    splitJson: false,
  },
};
