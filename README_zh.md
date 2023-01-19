<h1 align="center">
    <a href="https://www.npmjs.com/package/vue3-gettext" target="_blank">Vue 3 Gettext 💬</a>
</h1>
<br/>

使用 [gettext](https://en.wikipedia.org/wiki/Gettext) 国际化 [Vue 3](http://vuejs.org) 应用程序。

<br>
<p align="center">
 <a href="https://jshmrtn.github.io/vue3-gettext/zh/">快速上手</a> | <a href="https://jshmrtn.github.io/vue3-gettext/zh/demo.html">在线演示</a> | <a href="https://jshmrtn.github.io/vue3-gettext/zh/setup.html">使用文档</a> | <a href="README.md">English</a>
</p>
<br>

## 基本用法

模版:

```jsx
<span>
  {{ $gettext("I'm %{age} years old!", { age: 32 }) }}
</span>
```

代码:

```ts
const { $gettext } = useGettext();

console.log($gettext("Hello World!"));
```

## 特性

- 简单、符合人体工学的 API 接口
- 支持响应式翻译(Vue 模板和 TypeScript/JavaScript 代码)
- 提供 CLI 工具自动从代码文件中提取翻译文本
- 支持复数和上下文翻译

## 贡献

提交 PR 前请确保代码已经格式化(项目中已有 `prettier` 配置)，而且测试(`npm run test`)已通过。

并且写清楚改了什么以及为什么要这样改。


## 致谢
本项目在很大程度上依赖于 [`vue-gettext`](https://github.com/Polyconseil/vue-gettext/) 所做的工作.

## License

[MIT](http://opensource.org/licenses/MIT)
