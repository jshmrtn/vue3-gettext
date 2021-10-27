# `v-translate` directive

<LanguageSwitch style="margin-top: 2rem" />

```vue live
<span v-translate>Hello</span>
```

### Toggle visibility

<!-- prettier-ignore-start -->
```vue live
let yes = true;
<button
  @click="yes = !yes"
  style="margin-right: 0.5rem"
>
  Toggle
</button>

<span v-if="yes" v-translate="yes">Yes</span>
<span v-else v-translate>No</span>
```
<!-- prettier-ignore-end -->

### Parameters

Variables can be used directly or set as parameters of `v-translate`.

<!-- prettier-ignore-start -->
```vue live
let name = "Peter";
<input v-model="name" type="text" />

<p v-translate>Hello %{ name }!</p>
```
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
```vue live
let inputValue = "Peter";
<input v-model="inputValue" type="text" />

<p v-translate="{ name: inputValue }">Hello %{ name }!</p>
```
<!-- prettier-ignore-end -->

### Pluralization

<!-- prettier-ignore-start -->
```vue live
let count = 0;
<button
  @click="count--"
>-</button>
{{ count }}
<button
  @click="count++"
>+</button>

<p 
 v-translate="{ n: count }"
 :translate-n="count"
 translate-plural="%{ n } cars"
>
  %{ n } car
</p>
```
<!-- prettier-ignore-end -->
