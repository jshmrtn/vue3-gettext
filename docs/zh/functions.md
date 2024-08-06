# 全局属性
在 `<template>` 模板中可以使用翻译函数，当然在 scripts 代码中也可以。

## 翻译函数

### `$gettext`
普通翻译函数

```vue
<template>
  {{ $gettext("My message") }}
</template>
```

```ts
const { $gettext } = useGettext();

$gettext("My message");
```

#### 参数插值

```vue
<template>
  {{ $gettext("My message for %{ name }", { name: "Rudi" }) }}
</template>
```

### `$pgettext`
上下文翻译，第一个参数是上下文，第二个参数是待翻译内容。

```vue
<template>
  {{ $pgettext("my_context", "My message") }}
</template>
```

```ts
const { $pgettext } = useGettext();

$pgettext("my_context", "My message");
```

#### 参数插值

```vue
<template>
  {{ $pgettext("my_context", "My message for %{ name }", { name: "Rudi" }) }}
</template>
```

### `$ngettext`
用于支持复数翻译。

```vue
<template>
  {{ $ngettext("apple", "apples", 5) }}
</template>
```

```ts
const { $ngettext } = useGettext();

$ngettext("apple", "apples", 5);
```

#### 参数插值

```vue
<template>
  {{ $ngettext("apple for %{ name }", "apples for %{ name }", 5, { name: "Rudi" }) }}
</template>
```

### `$npgettext`
带上下文的复数翻译。

```vue
<template>
  {{ $npgettext("my_context", "apple", "apples", 5) }}
</template>
```

```ts
const { $npgettext } = useGettext();

$npgettext("my_context", "apple", "apples", 5);
```

#### 参数插值

```vue
<template>
  {{ $npgettext("my_context", "apple for %{ name }", "apples for %{ name }", 5, { name: "Rudi" }) }}
</template>
```

### `$language`
这个属性是插件实例，可以通过这个属性访问插件实例的属性/方法。比如可以拿到当前语言：


```vue
<template>
  {{ $language.current }}
</template>
```

```ts
const gettext = useGettext();

console.log(gettext.current);
```

### `$gettextInterpolate`

<div style="margin-top: 1rem;" class="warning">
这个帮助函数已经不需要使用了，因为上面的翻译函数已经支持了参数插值。
</div>

这是一个用于支持参数插值(格式化参数)的帮助函数。

```vue
<template>
  {{ $gettextInterpolate($pgettext("My message for %{ name }"), { name: "Rudi" }) }}
</template>
```

```ts
const { interpolate } = useGettext();

interpolate($gettext("My message for %{ name }"), { name: "Rudi" });
```

### 自定义翻译函数名称
你可以在 `createGettext` 时通过 `globalProperties` 选项自定义翻译函数的名称，参见 [插件配置](./configuration.md)。

例如，要使用 WordPress 的翻译名称风格，可以作如下配置：
```ts
import { createGettext } from "vue3-gettext";

const gettext = createGettext({
  ...
  globalProperties: {
    gettext: ['$gettext', '__'],  // 这样支持同时使用 $gettext, __ 两种方式
    ngettext: ['$ngettext', '_n'],
    pgettext: ['$pgettext', '_x'],
    npgettext: ['$npgettext', '_nx'],
  }
})

```
如果 VSCode 警告 `Property '{0}' does not exist on type '{1}'. ts(2339)`(类型“xxx”上不存在“__”属性), 请考虑新建一个 `gettext.d.ts` 文件，内容如下：
```ts
export { };
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        __: (msgid: string, parameters?: {
            [key: string]: string;
        }) => string;
        _x: (context: string, msgid: string, parameters?: {
            [key: string]: string;
        }) => string;
        _n: (msgid: string, plural: string, n: number, parameters?: {
            [key: string]: string;
        }) => string;
        _xn: (context: string, msgid: string, plural: string, n: number, parameters?: {
            [key: string]: string;
        }) => string;
    }
}
```

## Html 转义
默认地，所有的翻译函数都会进行 html 转义，不过也可以通过最后一个参数 `disableHtmlEscaping`  来控制是否转义。
如果确实需要包含 html 标签，你需要指定该参数为 true 以避免转义，并且将结果通过 [`v-html`](https://cn.vuejs.org/api/built-in-directives.html#v-html) 来显示:

```vue
<template>
  <span v-html="$gettext('My %{name}', { name: '<b>Rudi</b>' }, true)"></span>
</template>
```
请谨慎使用 [`v-html`](https://cn.vuejs.org/api/built-in-directives.html#v-html)。不要将用户输入的内容用于 v-html，否则可能引起 XSS 攻击。
