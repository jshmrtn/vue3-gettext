# vue3-gettext 🌍

Translate [Vue](http://vuejs.org) applications with [gettext](https://en.wikipedia.org/wiki/Gettext).

## Features

- Simple, ergonomic API
- Very **little overhead** for **translation-ready apps**
  - In gettext, translation keys (message ids) don't have to be manually defined
- CLI tools to **automatically extract messages** from code
- Easy pluralization

## Basic workflow

### 1. Use translation functions in your code:

```ts
$gettext("I'm %{age} years old!", { age: 32 });
```

### 2. Extract messages

Run `vue-gettext-extract` to extract messages into a `.pot` file and `.po` files for each of your configured languages:

```bash
$ vue-gettext-extract

# creates:
language
├── LINGUAS
├── en_US.po
├── fr_FR.po
├── it_IT.po
├── zh_CN.po
└── messages.pot
```

### 3. Translate and compile messages

Edit the `msgstr`s in the `.po` files with a text editor or specialized tools like [POEdit](https://poedit.net/):

```po
# de_DE.po
msgid "I'm %{age} years old!"
msgstr "Ich bin %{age} Jahre alt!"
```

```bash
$ vue-gettext-compile

# creates:
language
└── translations.json
```
