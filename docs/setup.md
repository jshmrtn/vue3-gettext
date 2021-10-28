# Setup

## Installation

## Configuration

```javascript
module.exports = {
  input: {
    path: "./docs/.vuepress",
    include: ["**/*.html", "**/*.vue"],
    exclude: [],
  },
  output: {
    path: "./docs/language",
    locales: ["en_GB", "fr_FR", "it_IT"],
    flat: false,
    linguas: true,
  },
};
```
