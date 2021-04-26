# vue3-gettext 💬

Translate [Vue.js](http://vuejs.org) applications with [gettext](https://en.wikipedia.org/wiki/Gettext).

## Table of Contents

1. [Installation](#installation)
1. [Basic usage](#basic-usage)
1. [Workflow](#workflow)
1. [Configuration](#configuration)
1. [Annotating strings](#annotating-strings-in-templates-html-or-vue-files)
1. [Message extraction and compilation](#message-extraction-and-compilation)
1. [Dependencies](##Dependencies)
1. [Contribute](#Contribute)
1. [Credits](#Credits)
1. [License](#License)

## Installation

```shell
npm i @jshmrtn/vue3-gettext
```

```shell
npm i -D easygettext
```

#### `main.js`

```javascript
import { createGettext } from "@jshmrtn/vue3-gettext";
import { createApp } from "vue";
import translations from "./path/to/translations.json";

const gettext = createGettext({
  availableLanguages: {
    en_GB: "British English",
  },
  defaultLanguage: "en_GB",
  translations,
});

const app = createApp(App);
app.use(gettext);
```

## Basic usage

Use the component or directive to annotate translatable strings:

```html
<translate>Hello!</translate>

<span v-translate>Hello!</span>
```

Or inject the plugin using `useGettext` (Example of a language switcher):

```vue
<template>
  <div>
    <select v-model="language.current">
      <option v-for="(language, key) in language.available" :key="key" :value="key">{{ language }}</option>
    </select>
  </div>
</template>

<script>
import { useGettext } from "@jshmrtn/vue3-gettext";

export default {
  setup() {
    const language = useGettext();
    return {
      language,
    };
  },
};
</script>
```

## Workflow

1. **Annotate strings**: annotate all the translatable strings in your project using the `<translate>` component, the `v-translate` directive or by calling the gettext functions (`gettext`, `pgettext`, `ngettext`, `npgettext`) directly.

2. **Extract strings**: you can now extract all strings to create message files. A message file is just a plain-text file with a `.po` file extension, representing a single language, that contains all available translation strings as keys and how they should be represented in the given language.

   `vue3-gettext` provides scripts to make this straightforward. Take a look at the [Message extraction and compilation](#message-extraction-and-compilation) section.

3. **Translate message files**: a translator needs to fill out the translations of each generated `.po` files. I recommend you use software like [poedit](https://poedit.net/) (some alternatives are listed on wikipedia [here](https://en.wikipedia.org/wiki/Gettext#See_also)).

4. **Compile translations**: once all message files have been translated, use [`gettext-compile`](https://github.com/Polyconseil/easygettext#gettext-compile) to make the translated `.po` files usable in a Vue app. This will merge all translated `.po` files into a `.json` file ready to be used by `vue3-gettext`.

## Configuration

The options you can pass to `createGettext` are:

### `availableLanguages`

Type: `{ [key: string]: string }`

Default: `{ en_US: "English" }`

An object that represents the list of the available languages for the app whose keys are [**local names**](http://www.localeplanet.com/icu/) (e.g. [`en`](https://www.gnu.org/software/gettext/manual/html_node/Language-Codes.html#Language-Codes) or [`en_US`](https://www.gnu.org/software/gettext/manual/html_node/Country-Codes.html#Country-Codes)) and whose values are [**language names**](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/languagenames.html) used for the display in UI, e.g. `English (United States)`. It's exposed in all Vue instances via `vm.$language.available`

#### Example

```javascript
availableLanguages: {
  en_GB: "British English",
  fr_FR: "Français",
  it_IT: "Italiano",
},
```

### `defaultLanguage`

Type: `string`

Default: `'en_US'`

The [**local name**](http://www.localeplanet.com/icu/) of the default language, e.g. `en_US`. This will be the current active language. It's exposed in all Vue instances via `vm.$language.current`

#### Example

```javascript
defaultLanguage: 'en_GB',
```

### `translations`

Type: `{ [key: string]: { [key: string]: any } }`

Default: `{}`

The JSON file of the application's translations (produced by `gettext-compile`).

#### Example

```javascript
translations: {
  "en_Use": {
    "Color": "Color",
    ...
  },
  "de_DE": {
    "Color": "Farbe",
    ...
  }
},
```

### `mutedLanguages`

Type: `string[]`

Default: `[]`

Discard warnings for missing translations for all languages of the list. This is useful to avoid messages from the language used in source code.

#### Example

```javascript
mutedLanguages: ['fr_FR', 'de'],
```

### `silent`

Type: `boolean`

Default: `false`

Enable or disable logs/warnings for missing translations and untranslated keys.

#### Example

```javascript
silent: true,
```

### `setGlobalProperties`

Type: `boolean`

Default: `true`

Sets the options `$gettext` `$pgettext` `$ngettext` `$npgettext` `$gettextInterpolate` `$language` on `app.config.globalProperties`, making the globally available in your templates. It is **not** recommended to disable this as `easygettext` will not extract strings if your functions are not named exactly like this.

### `provideDirective`

Type: `boolean`

Default: `true`

Registers the `v-translate` directive on you application. If you disable this option and want to provide the directive yourself, you must make sure to name it `translate` otherwise extraction will fail.

### `provideComponent`

Type: `boolean`

Default: `true`

Registers the `<translate>` component on you application. If you disable this option and want to provide the component yourself, you must make sure to name it `translate` otherwise extraction will fail.

### Full configuration example:

```javascript
import { createGettext } from "@jshmrtn/vue3-gettext";
import { createApp } from "vue";
import translations from "./path/to/translations.json";

const gettext = createGettext({
  availableLanguages: {
    en_GB: "British English",
    fr_FR: "Français",
    it_IT: "Italiano",
  },
  defaultLanguage: "en_GB",
  mutedLanguages: ["fr_FR"]
  translations,
  silent: true,
});

const app = createApp(App);
app.use(gettext);
```

## Dependencies

- [`easygettext`](https://github.com/Polyconseil/easygettext)

  - [`gettext-extract`](https://github.com/Polyconseil/easygettext#gettext-extract) to extract annotated strings from template files and produce a `.pot` (Portable Object Template) file.

  - [`gettext-compile`](https://github.com/Polyconseil/easygettext#gettext-compile) to produce the sanitized JSON version of a `.po` file.

- Some GNU gettext utilities to extract annotated strings from JavaScript files and generate `.po` files

  - [`msgmerge`](https://www.gnu.org/software/gettext/manual/html_node/msgmerge-Invocation.html#msgmerge-Invocation)

  - [`msginit`](https://www.gnu.org/software/gettext/manual/html_node/msginit-Invocation.html#msginit-Invocation)

  - [`msgattrib`](https://www.gnu.org/software/gettext/manual/html_node/msgattrib-Invocation.html#msgattrib-Invocation)

# Message extraction and compilation

`vue3-gettext` exposes two scripts to simplify this process:

## `vue-gettext-extract`

The extract script will create an output directory containing a `.pot` file, directories and a `.po` file for each locale. You can now edit the `.po` files to translate your app before compiling them.

You may set a source directory to extract messages from, an output directory and a comma separated list of all the locales in your application.

Example call:

```sh
vue-gettext-extract --src ./src --out ./src/language --locales "de_CH,en_US"
```

## `vue-gettext-compile`

The compile script will merge the contents of all the `.po` files and combine them into a single `translations.json` file that you can use with `vue3-gettext` (in the `createGettext` function).

You may set the directory where all your locales are located (the `--out` directory of the extract script) and the locales

Example call:

```sh
vue-gettext-compile --dir ./src/language --locales "de_CH,en_US"
```

## Recommended setup

We recommend setting up the scripts in your `package.json` like this:

```json
"scripts": {
    "gettext": "npm run gettext:extract && npm run gettext:compile",
    "gettext:extract": "vue-gettext-extract --src ./src --out ./src/language --locales \"de_CH,en_US\"",
    "gettext:compile": "vue-gettext-compile --dir ./src/language --locales \"de_CH,en_US\""
  },
```

# Annotating strings in templates (`.html` or `.vue` files)

### Use the component or the directive

Strings are marked as translatable in your templates using either the `translate` component or the `v-translate` directive:

```html
<translate>Hello!</translate> <span v-translate>Hello!</span>
```

This will automatically be translated. For instance, in French, it might read _Bonjour!_.

#### Singular

```html
<translate>Hello!</translate>
```

#### Plural

```html
<translate :translate-n="count" translate-plural="%{ count } cars">%{ count } car</translate>
```

#### Context

```html
<translate translate-context="Verb">Foo</translate>
```

#### Comment

```html
<translate translate-comment="My comment for translators">Foo</translate>
```

#### Custom parameters

You can set up translation strings that are agnostic to how your app state is structured. This way you can change variable names within your app, it won't break your translation strings.

```html
<translate :translate-params="{name: userFullName}">Foo %{name}</translate>
```

### HTML support: difference between the component and the directive

It proves to be tricky to support interpolation with HTML content in Vue.js **components** because it's hard to access the raw content of the component itself.

So if you need to include HTML content in your translations you may use the **directive**.

The directive has the same set of capabilities as the component, **except for translate-params** which should be passed in as an expression.

```html
<p
  v-translate="{count: carNumbers}"
  :translate-n="carNumbers"
  translate-plural="<strong>%{ count }</strong> cars"
  translate-comment="My comment for translators"
>
  <strong>%{ count }</strong> car
</p>
```

### Custom HTML tag for the `translate` component

When rendered, the content of the `translate` component will be wrapped in a `span` element by default. You can also use another tag:

```html
<translate tag="h1">Hello!</translate>
```

### Interpolation

You can use the tokens `%{` and `}` to for string interpolation within messages:

```html
<translate>Hello %{ name }</translate>
```

### Directive, interpolation and raw HTML in data

Raw HTML in data is interpreted as plain text, not HTML. In order to output real HTML, you will need to use the `render-html` attribute and set it to `true`.

```html
<p v-translate render-html="true">Hello %{ openingTag }%{ name }%{ closingTag }</p>
```

Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to XSS vulnerabilities. Only use HTML `render-html="true"` on trusted content and never on user-provided content.

### Caveats

#### Caveat when using either the component `<translate>` or directive `v-translate` with interpolation inside `v-for`

It's not possible to access the scope within `v-for`, example:

```html
<p>
  <translate v-for="name in names">Hello %{name}</translate>
  <span v-for="name in names" v-translate>Hello %{name}</span>
</p>
```

Will result in all `Hello %{name}` being rendered as `Hello name`.

You need to pass in custom parameters for it to work:

```html
<p>
  <translate v-for="name in names" :translate-params="{name: name}">Hello %{name}</translate>
  <span v-for="name in names" v-translate="{name: name}">Hello %{name}</span>
</p>
```

#### Caveat when using `v-translate` with Vue components or Vue specific attributes

It's not possible to support components or attributes like `v-bind` and `v-on`. So make sure that your HTML translations stay basic for now.

For example, this is _not supported_:

```html
<p v-translate>Please <button @click="doSomething">click</button> here to view <my-account></my-account></p>
```

## 1b) Annotating strings in JavaScript code (`.js` or `.vue` files)

Strings are marked as translatable in your Vue instances JavaScript code using methods from the plugin.

### Singular

```javascript
const { $gettext } = useGettext();

$gettext(msgid);
```

### Plural

```javascript
const { $ngettext } = useGettext();

$ngettext(msgid, plural, n);
```

### Context

```javascript
const { $pgettext } = useGettext();

$pgettext(context, msgid);
```

### Context + Plural

```javascript
const { $npgettext } = useGettext();

$npgettext(context, msgid, plural, n);
```

### Interpolation support

You can use interpolation in your JavaScript using the method `interpolate` in combination with one of the annotation functions.

```javascript
const { $ngettext, interpolate } = useGettext();

const translated = $ngettext("%{ n } foo", "%{ n } foos", n);
const interpolated = interpolate(translated, { n: n });
```

`interpolate` dynamically populates a translation string with a given context object.

# Contribute

Please make sure your code is properly formatted (the project contains a `prettier` config) and all the tests run successfully (`npm run test`) when opening a pull request.

Please specify clearly what you changed and why.

# Credits

This plugin heavily relies on the work of the original [`vue-gettext`](https://github.com/Polyconseil/vue-gettext/).

# License

[MIT](http://opensource.org/licenses/MIT)
