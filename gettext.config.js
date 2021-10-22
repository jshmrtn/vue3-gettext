module.exports = {
  input: {
    path: "./dev",
    include: ["**/*.js", "**/*.ts", "**/*.vue"],
    exclude: [],
  },
  output: {
    path: "./dev/language",
    locales: ["en_GB", "fr_FR", "it_IT"],
    flat: false,
    linguas: true,
  },
};
