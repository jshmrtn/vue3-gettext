# `<translate>`

<div class="warning">
  <b>Deprecated</b>
  <p>The <code>&lt;translate&gt;</code> component and <code>v-translate</code> directive have been deprecated, use the functions instead.</p>
  <p>Since Vue 3, extracting messages from within components is awkward and error-prone as well as cause issues with server-side rendering.</p>
  To make the transition easier, they will keep working until a future major release.
</div>

## Usage

<!-- prettier-ignore-start -->
```vue
<translate>Hello</translate>
```
<!-- prettier-ignore-end -->

`<translate>` renders a `<span>` by default, use `tag` to override.

<!-- prettier-ignore-start -->
```vue
<translate tag="h1">Hello</translate>
```
<!-- prettier-ignore-end -->

### Parameters

If the parameter should change dynamically, use the `:translate-params` prop (or use the `v-translate` directive).

<!-- prettier-ignore-start -->
```vue
<translate :translate-params="{ name: 'Paul' }">Hello %{ name }!</translate>
```
<!-- prettier-ignore-end -->

### Pluralization

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

## Props

| Prop              | Description                                         | Type   | Default |
| ----------------- | --------------------------------------------------- | ------ | ------- |
| tag               | HTML tag that contains the message                  | string | span    |
| translate-n       | Determines what plural form to apply to the message | number | null    |
| translate-plural  | Pluralized message                                  | string | null    |
| translate-context | Gettext translation context                         | string | null    |
| translate-params  | Parameters to interpolate messages                  | Object | null    |
| translate-comment | Comment for the message id                          | string | null    |
