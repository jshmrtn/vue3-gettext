# Message extraction

To extract all the messages that you want translated from your application code, a bit of setup is required.

## Scripts

First, add scripts to your `package.json`:

```json { package.json }
"scripts": {
  ...
  "gettext:extract": "vue-gettext-extract",
  "gettext:compile": "vue-gettext-compile",
}
```

`npm run gettext:extract` extracts messages from your code and creates `.po` files.

`npm run gettext:compile` compiles the translated messages from the `.po` files to a `.json` to be used in your application.

Using these scripts is _theoretically_ optional if you have other means of extraction or may even want to write message files yourself.

## Configuration

Before running the scripts, create a file `gettext.config.js` in your application root. This is a configuration _only_ for the scripts above. A minimal configuration may look like this:

```js
module.exports = {
  output: {
    locales: ["en", "de"],
  },
};
```

You can also use a `gettext.config.mjs` file with the Ecmascript module format:

```js
export default {
  output: {
    locales: ["en", "de"],
  },
};
```

Here are all the available configuration options and their defaults:

<!-- TODO: update -->

```js
module.exports = {
  input: {
    path: "./src", // only files in this directory are considered for extraction
    include: ["**/*.js", "**/*.ts", "**/*.vue"], // glob patterns to select files for extraction
    exclude: [], // glob patterns to exclude files from extraction
    jsExtractorOpts: [
      // custom extractor keyword. default empty.
      {
        keyword: "__", // only extractor default keyword such as $gettext,use keyword to custom
        options: {
          // see https://github.com/lukasgeiter/gettext-extractor
          content: {
            replaceNewLines: "\n",
          },
          arguments: {
            text: 0,
          },
        },
      },
      {
        keyword: "_n", // $ngettext
        options: {
          content: {
            replaceNewLines: "\n",
          },
          arguments: {
            text: 0,
            textPlural: 1,
          },
        },
      },
    ],
    compileTemplate: false, // do not compile <template> tag when its lang is not html
  },
  output: {
    path: "./src/language", // output path of all created files
    potPath: "./messages.pot", // relative to output.path, so by default "./src/language/messages.pot"
    jsonPath: "./translations.json", // relative to output.path, so by default "./src/language/translations.json"
    locales: ["en"],
    flat: true, // create a subdirectory for each locale
    linguas: true, // create a LINGUAS file
    splitJson: false, // create separate json files for each locale. If used, jsonPath must end with a directory, not a file
  },
};
```

## Gotchas

When first extract, it will call `msginit` to create a `.po` file,
this command will set the `Plural-Forms` header, if the locale is in
[the embedded table](https://github.com/dd32/gettext/blob/master/gettext-tools/src/plural-table.c#L27)
of msginit.

Otherwise, as an experimental feature,
you can instruct msginit to use the information from Unicode CLDR,
by setting the `GETTEXTCLDRDIR` environment variable.
The program will look for a file named
`common/supplemental/plurals.xml` under that directory.
You can get the CLDR data from [http://cldr.unicode.org/](http://cldr.unicode.org/).
Or only download the [plurals.xml](https://raw.githubusercontent.com/unicode-org/cldr/main/common/supplemental/plurals.xml) file.
