# `<translate>`

<div class="warning">
  <b>已过时弃用</b>
  <p><code>&lt;translate&gt;</code> 组件和 <code>v-translate</code> 指令已被弃用，请使用 <a href='./functions.html'>翻译函数</a> 代替。</p>
  <p>从 Vue 3 开始，从组件中提取消息变得笨拙且容易出错，并且会导致服务器端渲染出现问题。</p>
  为了迁移方便，这些功能将会保留到之后的大版本升级。
</div>

## 用法

<!-- prettier-ignore-start -->
```vue
<translate>Hello</translate>
```
<!-- prettier-ignore-end -->

`<translate>` 默认渲染为 `<span>` 标签, 可以通过 `tag` 属性覆盖默认值。

<!-- prettier-ignore-start -->
```vue
<translate tag="h1">Hello</translate>
```
<!-- prettier-ignore-end -->

### 参数
如果参数是动态的，可以使用 `:translate-params` 属性（或使用 `v-translate` 指令）。

<!-- prettier-ignore-start -->
```vue
<translate :translate-params="{ name: 'Paul' }">Hello %{ name }!</translate>
```
<!-- prettier-ignore-end -->

### 复数

<!-- prettier-ignore-start -->
```vue
<translate
  :translate-params="{ amount: 2 }"
  :translate-n="2"
  translate-plural="%{ amount } cars"
>
  %{ amount } car
</translate>
```
<!-- prettier-ignore-end -->

## 属性

| 属性               | 说明                 | 类型   | 默认值 |
| ----------------- | -------------------- | ------ | ---- |
| tag               | 包裹翻译内容的标签      | string | span |
| translate-n       | 用于选择使用哪种复数形式 | number | null |
| translate-plural  | 复数形式              | string | null |
| translate-context | 上下文                | string | null |
| translate-params  | 需要插值的(格式化)参数  | Object | null |
| translate-comment | 翻译的注释            | string | null |
