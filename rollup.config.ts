import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

const extensions = [".js", ".ts"];
const htmlPlugin = {
  name: "vite-html",
  transform(code, id) {
    if (!id.endsWith(".html")) {
      return;
    }
    return `export default ${JSON.stringify(code)};`;
  },
};
export default [
  {
    input: "src/index.ts",
    external: ["vue"],
    plugins: [resolve({ extensions }), typescript()],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
  {
    input: "src/index.ts",
    external: ["vue"],
    plugins: [dts()],
    output: [{ file: pkg.types, format: "es" }],
  },
  {
    input: "scripts/gettext_compile.ts",
    external: ["fs/promises", "@vue/compiler-sfc", "glob", "cosmiconfig", "command-line-args", "gettext-extractor"],
    plugins: [resolve({ preferBuiltins: true }), typescript()],
    output: [{ file: pkg.bin["vue-gettext-compile"], format: "cjs", banner: "#!/usr/bin/env node" }],
  },
  {
    input: "scripts/gettext_extract.ts",
    external: [
      "fs/promises",
      "@vue/compiler-sfc",
      "cosmiconfig",
      "gettext-extractor",
      "chalk",
      "command-line-args",
      "glob",
    ],
    plugins: [resolve({ preferBuiltins: true }), typescript()],
    output: [{ file: pkg.bin["vue-gettext-extract"], format: "cjs", banner: "#!/usr/bin/env node" }],
  },
];
