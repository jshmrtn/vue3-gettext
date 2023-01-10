---
home: true
heroText: Vue 3 Gettext
tagline: 使用 Gettext 国际化你的 Vue3 应用程序
actions:
  - text: 在线演示
    link: /zh/demo.html
    type: primary
  - text: 安装与设置
    link: /zh/setup.html
    type: secondary
  - text: 文档
    link: /zh/setup.html
    type: secondary
footer: MIT Licensed | Copyright © 2020-present JOSHMARTIN GmbH
---

# 快速开始
## 1. 安装

```sh
npm i vue3-gettext@next
```
## 2. 引入
在 `main.ts`/`main.js` 中设置 gettext:

```javascript {3,11}
import { createGettext } from "vue3-gettext";
import { createApp } from "vue";
import translations from "./src/language/translations.json";

const app = createApp(App);
app.use(createGettext({
  availableLanguages: {
    en: "Engilish",
    zh: "简体中文",
  },
  defaultLanguage: 'zh',
  translations,
}));
```
高亮的行暂时会报错，后续抽取编译后会修复它。
更多配置选项请查看 [配置](./configuration.md) 。

## 3. 使用
在应用程序中使用 gettext:

```jsx
<span>{{ $gettext("Translate me") }}</span>
```

## 4. 自动抽取翻译与编译
> 详见 [自动抽取](./extraction.md) 。

**首先**，在 `package.json` 中添加 scripts:

```json { package.json }
"scripts": {
  ...
  "gettext:extract": "vue-gettext-extract",
  "gettext:compile": "vue-gettext-compile",
}
```

**然后**，在根目录新建 `gettext.config.js` 配置文件。
```js
module.exports = {
  input: {
    path: './src'
  },
  output: {
    locales: ["en", "zh"],
  },
};
```
更多配置项（比如自定义抽取关键字）请查看 [自动抽取](./extraction.md) 。

**最后**，运行如下指令自动抽取与编译。

`npm run gettext:extract` 自动从代码中抽取待翻译字符串并生成 `.po` 文件。

`npm run gettext:compile` 将翻译好的 `.po` 文件编译为 `.json` 文件以便在 `createGettext` 时引用。
