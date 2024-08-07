# Configuration

Once you have extracted your messages and compiled a `.json` file, you are ready to set up the gettext plugin in your `main.ts`/`main.js`:

```ts
import { createGettext } from "vue3-gettext";
import translations from "./language/translations.json";

const gettext = createGettext({
  availableLanguages: {
    en: "English",
    de: "Deutsch",
  },
  defaultLanguage: "en",
  translations: translations,
});

const app = createApp(App);
app.use(gettext);
```

All the available options can be found in the `GetTextOptions` type, these are the default values:

```ts
{
  availableLanguages: { en: "English" },
  defaultLanguage: "en",
  mutedLanguages: [],
  silent: false,
  translations: {},
  setGlobalProperties: true,
  globalProperties: { // custom global properties name
    language: ['$language'],   // the plugin instance
    gettext: ['$gettext'],     // ['$gettext', '__']
    pgettext: ['$pgettext'],   // ['$pgettext', '_n']
    ngettext: ['$ngettext'],   // ['$ngettext','_x']
    npgettext: ['$npgettext'], // ['$npgettext', '_nx']
    interpolate: ['$gettextInterpolate'],// deprecated
  },
}
```

## Gotchas

### Using gettext functions outside of components

If you need to have plain typescript/javascript files that must access gettext, you may simple move and export gettext from a separate file:

`gettext.ts`

```ts
export default createGettext({
  ...
});
```

Then import and use the functions:

```ts
import gettext from "./gettext";

const { $gettext } = gettext;

const myTest = $gettext("My translation message");
```
