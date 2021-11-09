---
home: true
# heroImage: /hero.png
heroText: Vue 3 Gettext
tagline: Translate your Vue 3 applications with Gettext
actions:
  - text: Quick Start
    link: /#quick-start
    type: primary
  - text: Setup
    link: /setup.html
    type: secondary
  - text: Docs
    link: /setup.html
    type: secondary
# features:
#   - title:
#     details:
# sidebar: true
footer: MIT Licensed | Copyright © 2020-present JOSHMARTIN GmbH
---

# Quick Start

```sh
npm i @jshmrtn/vue3-gettext
```

Set up gettext in your `main.ts`/`main.js`:

```javascript {main.ts/main.js}
import { createGettext } from "@jshmrtn/vue3-gettext";
import { createApp } from "vue";
import translations from "./src/language/translations.json";

const app = createApp(App);
app.use(createGettext({ translations }));
```

Use gettext functions, the `<translate>` component and `v-translate` directive in your application:

```jsx
<span>{{ $gettext("Translate me") }}</span>
<translate>Translate me</translate>
<span v-translate>Translate me</span>
```

Add scripts to your `package.json`:

```json { package.json }
"scripts": {
  ...
  "gettext:extract": "vue-gettext-extract",
  "gettext:compile": "vue-gettext-compile",
}
```

`npm run gettext:extract` extracts translation keys from your code and creates `.po` files to translate.

`npm run gettext:compile` compiles the translated messages from the `.po` files to a `.json` to be used in your application.
