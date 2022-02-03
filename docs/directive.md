# `v-translate`

<div class="warning">
  <b>Deprecated</b>
  <p>The <code>&lt;translate&gt;</code> component and <code>v-translate</code> directive have been deprecated, use the functions instead.</p>
  <p>Since Vue 3, extracting messages from within components is awkward and error-prone as well as cause issues with server-side rendering.</p>
  To make the transition easier, they will keep working until a future major release.
</div>

## Basic usage

```vue
<span v-translate>Hello</span>
```

### Parameters

Variables for message interpolation must be passed as value to the `v-translate` directive directly.

<!-- prettier-ignore-start -->
```vue
<p v-translate="{ name: 'Jessica' }">Hello %{ name }!</p>
```
<!-- prettier-ignore-end -->

### Pluralization

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

## Attributes

| Prop              | Description                                                                                  | Type    | Default |
| ----------------- | -------------------------------------------------------------------------------------------- | ------- | ------- |
| v-translate       | **Required**. You can optionally provide an object with parameters for message interpolation | object  | null    |
| translate-n       | Determines what plural form to apply to the message                                          | number  | null    |
| translate-plural  | Pluralized message                                                                           | string  | null    |
| translate-context | Gettext translation context                                                                  | string  | null    |
| translate-comment | Comment for the message id                                                                   | string  | null    |
| render-html       | Will disable HTML escaping and render it directly                                            | boolean | false   |
