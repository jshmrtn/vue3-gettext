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

Here are all the available configuration options and their defaults:

```js
module.exports = {
  input: {
    path: "./src", // only files in this directory are considered for extraction
    include: ["**/*.js", "**/*.ts", "**/*.vue"], // glob patterns to select files for extraction
    exclude: [], // glob patterns to exclude files from extraction
  },
  output: {
    path: "./src/language", // output path of all created files
    potPath: "./messages.pot", // relative to output.path, so by default "./src/language/messages.pot"
    jsonPath: "./translations.json", // relative to output.path, so by default "./src/language/translations.json"
    locales: ["en"],
    flat: false, // don't create subdirectories for locales
    linguas: true, // create a LINGUAS file
    splitJson: false, // create separate json files for each locale. If used, jsonPath must end with a directory, not a file
  },
};
```
