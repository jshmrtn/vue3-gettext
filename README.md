<h1 align="center">
  <a href="https://www.npmjs.com/package/vue3-gettext" target="_blank">
  Vue 3 Gettext 💬
  </a>
</h1>
<br/>

Translate [Vue 3](http://vuejs.org) applications with [gettext](https://en.wikipedia.org/wiki/Gettext).

<br>
<p align="center">
 <a href="https://jshmrtn.github.io/vue3-gettext/">Getting started</a> | <a href="https://jshmrtn.github.io/vue3-gettext/demo.html">Demo</a> | <a href="https://jshmrtn.github.io/vue3-gettext/setup.html">Documentation</a> | <a href="README_zh.md">中文</a>
</p>
<br>

## Basic usage

In templates:

```jsx
<span>
  {{ $gettext("I'm %{age} years old!", { age: 32 }) }}
</span>
```

In code:

```ts
const { $gettext } = useGettext();

console.log($gettext("Hello World!"));
```

## Features

- simple, ergonomic API
- reactive translations in Vue templates and TypeScript/JavaScript code
- CLI to automatically extract messages from code files
- support for pluralization and message contexts

## Contribute

Please make sure your code is properly formatted (the project contains a `prettier` config) and all the tests run successfully (`npm run test`) when opening a pull request.

Please specify clearly what you changed and why.

## Credits

This plugin relies heavily on the work of the original [`vue-gettext`](https://github.com/Polyconseil/vue-gettext/).

## License

[MIT](http://opensource.org/licenses/MIT)
