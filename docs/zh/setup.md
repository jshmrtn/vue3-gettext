# 安装步骤

## 先决条件

Vue 3 Gettext 提供了脚本自动抽取待翻译字符串为符合 [gettext](https://www.gnu.org/software/gettext/manual/html_node/index.html) 规范的 [PO 文件](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html) 。
并且自动将翻译后的 po 文件 merge 到一个 json 文件中，以便在应用程序中引用。
因此你必须首先安装 GNU gettext 工具包，以便这些脚本可以正常工作。

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

在 Windows 系统中，安装 gettext 有多种方式。

- 你可以使用 WSL2, 像在 Ubuntu 中安装 getext 一样直接安装（推荐方式）；
- 也可以通过 mingw64 或者 cygwin 安装；
- 还可以直接 [下载](https://mlocati.github.io/articles/gettext-iconv-windows.html) 安装。

## 安装

使用 `npm` 或者 `yarn` 安装 Vue 3 Gettext：

```sh
npm i vue3-gettext
```
