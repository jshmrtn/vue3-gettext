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
            {
                keyword: "_x",
                options: {
                    content: {
                        replaceNewLines: "\n",
                    },
                    arguments: {
                        context: 0,
                        text: 1,
                    },
                },
            },
            {
                keyword: "_xn",
                options: {
                    content: {
                        replaceNewLines: "\n",
                    },
                    arguments: {
                        context: 0,
                        text: 1,
                        textPlural: 2,
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
