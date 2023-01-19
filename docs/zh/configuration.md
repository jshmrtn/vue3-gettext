# 配置
将自动抽取的 po 文件翻译完成，并编译为 json 文件后，就可以在 `main.ts`/`main.js` 中配置 gettext 插件了。


```ts
import { createGettext } from "vue3-gettext";
import translations from "./language/translations.json";

const gettext = createGettext({
  availableLanguages: {
    en: "English",
    de: "Deutsch",
  },
  defaultLanguage: "en",
  translations: translations,
});

const app = createApp(App);
app.use(gettext);
```

具体的选项配置可查看 `GetTextOptions` 这个类型，下面是各配置的默认值：

```ts
{
  // 支持的语言
  availableLanguages: { en: "English" },
  // 默认语言
  defaultLanguage: "en",
  // 不打印警告信息的语言
  mutedLanguages: [],
  // 默认会打印警告信息
  silent: false,
  // 翻译后的 json 资源
  translations: {},
  // 默认会在将 $gettext 等函数注册到全局
  setGlobalProperties: true,
  // 注册这些属性到全局
  globalProperties: {
    language: ['$language'], // gettext 实例
    gettext: ['$gettext'], // 改成 ['$gettext', '__'] 这样支持同时使用 $gettext, __ 两种方式
    ngettext: ['$ngettext'],// ['$ngettext','_n'] 同理支持 $ngettext 与 _n 两种方式
    pgettext: ['$pgettext'],// ['$pgettext', '_x'] 这些 _x, _nx 是 WordPress 风格
    npgettext: ['$npgettext'],// ['$npgettext', '_nx'] 带上下文的复数翻译
    interpolate: ['$gettextInterpolate'], // 已废弃: gettext 内部的插值函数
  },
  provideDirective: true,
  provideComponent: true,
}
```

## 踩坑陷阱

### 在组件外使用 gettext 函数
如果你需要在纯 typescript/javascript 文件中使用 gettext,
你可以将上述配置代码移到单独一个文件中配置并导出 gettext.


`gettext.ts`:
```ts
export default createGettext({
  ...
});
```

然后在需要的地方导入并使用。

`main.ts`:
```ts
import gettext from "./gettext";
...
const app = createApp(App);

app.use(gettext);
```

`other.ts`:
```ts
import gettext from "./gettext";

const { $gettext } = gettext;

const myTest = $gettext("My translation message");
```
