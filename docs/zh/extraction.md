# 自动抽取

要使用自动抽取功能，你需要做一些如下准备工作。

## 脚本
首先，在 `package.json` 中添加 scripts 指令:

```json { package.json }
"scripts": {
  ...
  "gettext:extract": "vue-gettext-extract",
  "gettext:compile": "vue-gettext-compile",
}
```

`npm run gettext:extract` 从代码中自动抽取待翻译字符串并创建为 `.po` 文件。

`npm run gettext:compile` 把翻译好的 `.po` 文件编译为 `.json` 文件以便在程序中引用。

这些指令 _理论上_ 是可选的，因为如果你有其他方式可以达到同样的目的的话也未尝不可，甚至也可以手写 po 文件。


## 配置
运行这些脚本之前，你需要在根目录新建一个名为 `gettext.config.js` 的配置文件。
该文件 _只_ 会被上述脚本读取。最简示例如下所示：


```js
module.exports = {
  output: {
    locales: ["en", "de"],
  },
};
```

下面列出所有配置选项和默认值：

```js
module.exports = {
  input: {
    path: "./src", // 只有该目录下的文件会被自动抽取
    include: ["**/*.js", "**/*.ts", "**/*.vue"], // 需要抽取的文件
    exclude: [], // 需要排除的文件
    jsExtractorOpts:[ // 自定义抽取关键字
      {
        keyword: "__", // 默认只抽取 $gettext 这些内置的关键字，可以通过 keyword 自定义
        options: {    // 详细说明可查看 https://github.com/lukasgeiter/gettext-extractor
          content: {
            replaceNewLines: "\n",
          },
          arguments: {
            text: 0, // 这个 __ 函数的第几个参数是待翻译字符串
          },
        },
      },
      {
        keyword: "_n", // 对应 $ngettext
        options: {
          content: {
            replaceNewLines: "\n",
          },
          arguments: {
            text: 0,      // 第0个参数是待翻译字符串
            textPlural: 1,// 第1个参数是复数字符串
          },
        },
      },
    ],
  },
  output: {
    path: "./src/language", // 抽取后生成的文件存放的路径
    potPath: "./messages.pot", // 相对于 output.path, 所以默认值是 "./src/language/messages.pot"
    jsonPath: "./translations.json", // 相对于 output.path, 所以默认值是 "./src/language/translations.json"
    locales: ["en"], // 需要生成哪些语言的 po 文件
    flat: false, // 是否为每种语言单独创建一个文件夹
    linguas: true, // 创建一个 LINGUAS 文件
    splitJson: false, // 为每种语言生成一个 json 文件，如果为 true, jsonPath 应当是一个目录路径而不是一个文件路径
  },
};
```
