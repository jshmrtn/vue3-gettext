# `v-translate`

<div class="warning">
  <b>已过时弃用</b>
  <p><code>&lt;translate&gt;</code> 组件和 <code>v-translate</code> 指令已被弃用，请使用 <a href='./functions.html'>翻译函数</a> 代替。</p>
  <p>从 Vue 3 开始，从组件中提取消息变得笨拙且容易出错，并且会导致服务器端渲染出现问题。</p>
  为了迁移方便，这些功能将会保留到之后的大版本升级。
</div>

## 基本用法

```vue
<span v-translate>Hello</span>
```

### 参数
用于插值的变量必须作为值直接传递给 v-translate 指令。

<!-- prettier-ignore-start -->
```vue
<p v-translate="{ name: 'Jessica' }">Hello %{ name }!</p>
```
<!-- prettier-ignore-end -->

### 复数

<!-- prettier-ignore-start -->
```vue
<p
 v-translate="{ amount: 2 }"
 :translate-n="2"
 translate-plural="%{ amount } cars"
>
  %{ amount } car
</p>
```
<!-- prettier-ignore-end -->

## 属性

| Prop              |              描述                | 类型    | 默认值 |
| ----------------- | -------------------------------- | ------- | ------- |
| v-translate       | **必须**. 值不为空时表示翻译内容的参数 | object  | null    |
| translate-n       | 用于判断使用哪种复数形式              | number  | null    |
| translate-plural  | 复数形式                           | string  | null    |
| translate-context | 上下文                             | string  | null    |
| translate-comment | 翻译的注释                         | string  | null    |
| render-html       | 不转义直接输出 html                 | boolean | false   |
