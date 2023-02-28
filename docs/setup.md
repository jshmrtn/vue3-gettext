# Setup

## Prerequisites

Vue 3 Gettext provides scripts to automatically extract translation messages into gettext [PO files](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html) and, after translation, merge those into a JSON file that can be used in your application. You must install the GNU gettext utilities for those scripts to work:

**Ubuntu/Linux:**

```sh
sudo apt-get update
sudo apt-get install gettext
```

**macOS:**

```sh
brew install gettext
brew link --force gettext
```

**Windows:**

On Windows, you have multiple options. You can run the scripts and install gettext under WSL2 like you would with regular Ubuntu (recommended) or install gettext via mingw64 or cygwin. You may also find precompiled binaries [here](https://mlocati.github.io/articles/gettext-iconv-windows.html).

## Installation

Install Vue 3 Gettext using `npm` (or the package manager of your choice):

```sh
npm i vue3-gettext
```
