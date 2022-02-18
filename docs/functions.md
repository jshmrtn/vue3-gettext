# Functions

Translation functions are made available globally in `<template>` sections but can also be used in scripts.

## Functions

### `$gettext`

Simple message translation

```ts
<template>
  {{ $gettext("My message") }}
</template>
```

```ts
const { $gettext } = useGettext();

$gettext("My message");
```

#### Interpolation

```ts
<template>
  {{ $gettext("My message for %{ name }", { name: "Rudi" }) }}
</template>
```

### `$pgettext`

Takes a translation context as the first argument

```ts
<template>
  {{ $pgettext("my_context", "My message") }}
</template>
```

```ts
const { $pgettext } = useGettext();

$pgettext("my_context", "My message");
```

#### Interpolation

```ts
<template>
  {{ $pgettext("my_context", "My message for %{ name }", { name: "Rudi" }) }}
</template>
```

### `$ngettext`

Can be used to pluralize messages

```vue
<template>
  {{ $ngettext("apple", "apples", 5) }}
</template>
```

```ts
const { $ngettext } = useGettext();

$ngettext("apple", "apples", 5);
```

#### Interpolation

```ts
<template>
  {{ $ngettext("apple for %{ name }", "apples for %{ name }", 5, { name: "Rudi" }) }}
</template>
```

### `$npgettext`

Can be used to pluralize messages with a translation context

```vue
<template>
  {{ $npgettext("my_context", "apple", "apples", 5) }}
</template>
```

```ts
const { $npgettext } = useGettext();

$npgettext("my_context", "apple", "apples", 5);
```

#### Interpolation

```ts
<template>
  {{ $npgettext("my_context", "apple for %{ name }", "apples for %{ name }", 5, { name: "Rudi" }) }}
</template>
```

### `$language`

Provides access to the whole plugin, for example if you want to access the current language:

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
  This helper function has been made redundant since the translate functions now directly take interpolation parameters.
</div>

This is a helper function if you use parameters within your messages.

```vue
<template>
  {{ $gettextInterpolate($pgettext("My message for %{ name }"), { name: "Rudi" }) }}
</template>
```

```ts
const { interpolate } = useGettext();

interpolate($gettext("My message for %{ name }"), { name: "Rudi" });
```

## Html escaping

All the translation functions escape html by default and take a `disableHtmlEscaping` as their last parameter. If your translation messages or parameters contain html tags, you will have to set this to `true` and render the message using [`v-html`](https://vuejs.org/api/built-in-directives.html#v-html):

```vue
<template>
  <span v-html="$gettext('My %{name}', { name: '<b>Rudi</b>' }, true)"></span>
</template>
```

Be careful when using [`v-html`](https://vuejs.org/api/built-in-directives.html#v-html). Don't use it for user-provided content so you're not vulnerable for XSS attacks.
