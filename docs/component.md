# `<translate>`

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
