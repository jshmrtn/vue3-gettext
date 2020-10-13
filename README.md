# vue3-gettext

> :warning: **WIP**: This project is based on the original [vue-gettext](https://github.com/Polyconseil/vue-gettext). It's still in development and has not yet been used in production. The readme has not been updated yet.

Translate [Vue.js](http://vuejs.org) applications with [gettext](https://en.wikipedia.org/wiki/Gettext).

## Installation

```shell
npm i @jshmrtn/vue3-gettext
```

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

<translate>Hello!</translate>
<span v-translate>Hello!</span>

Or inject the plugin using `useGettext` (Example of a language switcher):

```vue
<template>
  <div>
    <select v-model="language.current">
      <option v-for="(language, key) in language.availableLanguages" :key="key" :value="key">{{ language }}</option>
    </select>
  </div>
</template>

<script>
import { useGettext } from "@jshmrtn/vue3-gettext";

export default {
  setup() {
    const language = useGettext();
    return {
      ...language,
    };
  },
};
</script>
```

## Workflow

1. **Annotating strings**: annotate all the translatable strings in your project using the `<translate>` component, the `v-translate` directive or by calling the gettext functions (`gettext`, `pgettext`, `ngettext`, `npgettext`) directly.

2. **Extracting strings**: you can now extract all strings to create message files. A message file is just a plain-text file with a `.po` file extension, representing a single language, that contains all available translation strings as keys and how they should be represented in the given language.

`vue3-gettext` provides scripts to make this straightforward.

<!-- TODO link to scripts -->

3. **Translating message files**: a translator needs to fill out the translations of each generated `.po` files. I recommend you use software like [poedit](https://poedit.net/) (some alternatives are listed on wikipedia [here](https://en.wikipedia.org/wiki/Gettext#See_also)).

4. **Compiling translations**: once all message files have been translated, use [`gettext-compile`](https://github.com/Polyconseil/easygettext#gettext-compile) to make the translated `.po` files usable in a Vue app. This will merge all translated `.po` files into a `.json` file ready to be used by `vue3-gettext`.

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

### `mixins`

Type: `{ [key: string]: (language: string) => any }`

Default: `{}`

Mixins allows extending the plugin instance with your own properties. This is helpful if you want to provide shared computed properties, e.g.

#### Example

```javascript
mixins: {
  upperCaseLang: (language) => computed(() => lang.toUpperCase()),
},
```

### `silent`

Type: `boolean`

Default: `false`

Enable or disable logs/warnings for missing translations and untranslated keys.

#### Example

```javascript
silent: true,
```

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
  mixins: {
    languageWithoutRegion: (lang) => computed(() => lang.current.toLowerCase().split("_")[0]),
  },
  defaultLanguage: "en_GB",
  mutedLanguages: ["fr_FR"]
  translations,
  silent: true,
});

const app = createApp(App);
app.use(gettext);
```

## What does `vue3-gettext` depend on?

- [`easygettext`](https://github.com/Polyconseil/easygettext)

  - [`gettext-extract`](https://github.com/Polyconseil/easygettext#gettext-extract) to extract annotated strings from template files and produce a `.pot` (Portable Object Template) file.

  - [`gettext-compile`](https://github.com/Polyconseil/easygettext#gettext-compile) to produce the sanitized JSON version of a `.po` file.

- Some GNU gettext utilities to extract annotated strings from JavaScript files and generate `.po` files

  - [`msgmerge`](https://www.gnu.org/software/gettext/manual/html_node/msgmerge-Invocation.html#msgmerge-Invocation)

  - [`msginit`](https://www.gnu.org/software/gettext/manual/html_node/msginit-Invocation.html#msginit-Invocation)

  - [`msgattrib`](https://www.gnu.org/software/gettext/manual/html_node/msgattrib-Invocation.html#msgattrib-Invocation)

Those tools should be integrated in your build process. We'll show you an example later.

## `vm.$language`

After the plugin initialization, a `languageVm` Vue instance is injected
into every component as `vm.$language`.

It exposes the following properties:

- `vm.$language.available`: an object that represents the list of the available languages (defined at configuration time)

- `vm.$language.current`: the current language (defined at configuration time)

- whatever you passed to the plugin mixin

You can use `vm.$language.current` and `vm.$language.available` to e.g. easily build a language switch component with a single template:

```html
<template>
  <div>
    <select name="language" v-model="$language.current">
      <option v-for="(language, key) in $language.available" :value="key">{{ language }}</option>
    </select>
  </div>
</template>
```

## `Vue.config.language`

After the plugin initialization, a global and reactive `language` property is added to `Vue.config` that you can use to get or set the current language outside of Vue instances.

```javascript
> Vue.config.language
'en_GB'
> Vue.config.language = 'fr_FR'
```

You can use `Vue.config.language` to e.g. configure a third party plugin in a filter:

```javascript
import moment from "moment";
import Vue from "vue";

const dateFormat = function (value, formatString) {
  moment.locale(Vue.config.language);
  return moment(value).format(arguments.length > 1 ? formatString : "dddd D MMMM HH:mm:ss");
};
```

# Workflow

1. Annotate your strings

2. Extract translations (`make makemessages`)

3. Translate message files

4. Compile translations (`make translations`)

```
   Annotate    |       Extract        |              Translate                 |        Compile
--------------------------------------------------------------------------------------------------------
component.js
component.vue ---> /tmp/template.pot ---> app/locale/fr_FR/LC_MESSAGES/app.po ---> app/translations.json
template.html
```

## 1a) Annotating strings in templates (`.html` or `.vue` files)

### Use the component or the directive

Strings are marked as translatable in your templates using either the `translate` component or the `v-translate` directive:

```html
<translate>Hello!</translate> <span v-translate>Hello!</span>
```

This will automatically be translated. For instance, in French, it might read _Bonjour !_.

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

### Interpolation support

Since [interpolation inside attributes are deprecated](https://vuejs.org/v2/guide/syntax.html#Attributes) in Vue 2, we have to use another set of delimiters. Instead of the "Mustache" syntax (double curly braces), we use `%{` and `}`:

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

#### Caveat when using `v-translate` with interpolation

It's not possible (yet) to detect changes on the parent component's data, so you have to add an expression to the directive to provide a changing binding value. This is so that it can do a comparison on old and current value before running the translation in its `update` hook.

It is described in the [official guide](https://vuejs.org/v2/guide/custom-directive.html#Hook-Functions):

> update: called after the containing component has updated, but possibly before its children have updated. The directive's value may or may not have changed, but you can skip unnecessary updates by comparing the binding's current and old values...

```html
<p
  v-translate="{count: count, brand: brand}"
  :translate-n="count"
  translate-plural="<strong>%{ count }</strong> %{brand} cars"
  translate-comment="My comment for translators"
>
  <strong>%{ count }</strong> %{brand} car
</p>
```

#### Caveat when using either the component `<translate>` or directive `v-translate` with interpolation inside `v-for`

It's not possible (yet) to access the scope within `v-for`, example:

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

It's not possible (yet) to support components or attributes like `v-bind` and `v-on`. So make sure that your HTML translations stay basic for now.

For example, this is _not supported_:

```html
<p v-translate>Please <button @click="doSomething">click</button> here to view <my-account></my-account></p>
```

## 1b) Annotating strings in JavaScript code (`.js` or `.vue` files)

Strings are marked as translatable in your Vue instances JavaScript code using methods attached to `Vue.prototype`.

### Singular

```javascript
vm.$gettext(msgid);
```

### Plural

```javascript
vm.$ngettext(msgid, plural, n);
```

### Context

```javascript
vm.$pgettext(context, msgid);
```

### Context + Plural

```javascript
vm.$npgettext(context, msgid, plural, n);
```

### Interpolation support

You can use interpolation in your JavaScript using another method attached to `Vue.prototype`: `vm.$gettextInterpolate`.

```javascript
...
methods: {
  alertPlural (n) {
    let translated = this.$ngettext('%{ n } foo', '%{ n } foos', n)
    let interpolated = this.$gettextInterpolate(translated, {n: n})
    return window.alert(interpolated)
  },
},
...
```

`vm.$gettextInterpolate` dynamically populates a translation string with a given context object.

## 2) Extracting strings

This should be a step in your build process and this can be done in several ways.

Here are the things we must do:

1. extracting annotated strings from templates (`.html` and/or `.vue` files),

2. extracting annotated strings from JavaScript code (`.js` and/or `.vue` files),

3. creating a main `.pot` template based on the extracted strings,

4. creating editable `.po` files for each available language.

You'll need to install [`easygettext`](https://github.com/Polyconseil/easygettext) and use `gettext-extract` to extract annotated strings from template files and produce a `.pot` file.

You'll also need some GNU gettext utilities, namely `msgmerge`, `msginit` and `msgattrib` to generate `.po` files from the `.pot` dictionary file.

We use a `Makefile` with a `makemessages` target to automate this step. To give you an example, I included a `Makefile` with a `makemessages` target in this project that you can include in your build process.

Extracting strings and generating `.po` files becomes as easy as running:

```shell
make makemessages
```

## 3) Translating message files

The translator needs to fill out the translations of each generated `.po` files.

This can be done by you or outsourced to other firms or individuals since `.po` files are the industry standard for multilingual websites.

There is also a wide range of translation tools available in the gettext ecosystem. Some of them are listed on [Wikipedia](https://en.wikipedia.org/wiki/Gettext#See_also).

## 4) Compiling translations

This step focuses on making the translated `.po` files usable in your Vue.js app.

Once translated, install `easygettext` and use [`gettext-compile`](https://github.com/Polyconseil/easygettext#gettext-compile) to merge all translated `.po` files into a unique `.json` translation file.

Embed the `.json` translation file back into your application. This is done only one time at `vue-gettext` configuration time.

We use a `Makefile` with a `translations` target to automate this step.

Compiling translations becomes as easy as running:

```shell
make translations
```

Look at the included `Makefile` for an example.

# Contribute

Please make sure to read the [Pull request guidelines](https://github.com/Polyconseil/vue-gettext/blob/master/README_DEV.md#pull-request-guidelines) before making a pull request.

# Credits

This plugin heavily relies on the work of the original [`vue-gettext`](https://github.com/Polyconseil/vue-gettext/).

# License

[MIT](http://opensource.org/licenses/MIT)
