module.exports = {
  input: {
    path: "./dev",
    jsExtractorOpts: [
      {
        keyword: "__",
        options: {
          content: {
            replaceNewLines: "\n",
          },
          arguments: {
            text: 0,
          },
        },
      },
      {
        keyword: "_n",
        options: {
          content: {
            replaceNewLines: "\n",
          },
          arguments: {
            text: 0,
            textPlural: 1,
          },
        },
      },
    ],
  },
  output: {
    path: "./dev/language",
    locales: ["en_GB", "fr_FR", "it_IT", "zh_CN"],
    splitJson: false,
  },
};
