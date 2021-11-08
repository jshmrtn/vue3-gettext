# Functions

Translation functions are made available globally in `<template>` sections but can also be used in scripts.

## Functions

### `$gettext`

Simple message translation

```vue
<template>
  {{ $gettext("My message") }}
</template>
```

```ts
const { $gettext } = useGettext();

$gettext("My message");
```

### `$pgettext`

Takes a translation context as the first argument

```vue
<template>
  {{ $pgettext("my_context", "My message") }}
</template>
```

```ts
const { $pgettext } = useGettext();

$pgettext("my_context", "My message");
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

### `$gettextInterpolate`

This is a helper if you use parameters within your messages

```vue
<template>
  {{ $gettextInterpolate($pgettext("My message for %{ name }"), { name: "Rudi" }) }}
</template>
```

```ts
const { interpolate } = useGettext();

interpolate($gettext("My message for %{ name }"), { name: "Rudi" });
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
