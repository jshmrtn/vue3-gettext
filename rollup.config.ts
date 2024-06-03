import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import pkg from "./package.json" with { type: "json" };
import commonjs from "@rollup/plugin-commonjs";

const extensions = [".js", ".ts"];

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
    input: "scripts/gettext_extract.ts",
    external: [/node_modules/],
    plugins: [resolve({ preferBuiltins: true }), typescript(), commonjs()],
    output: [{ file: pkg.bin["vue-gettext-extract"], format: "cjs", banner: "#!/usr/bin/env node" }],
  },
  {
    input: "scripts/gettext_compile.ts",
    external: [/node_modules/],
    plugins: [resolve({ preferBuiltins: true }), typescript(), commonjs()],
    output: [{ file: pkg.bin["vue-gettext-compile"], format: "cjs", banner: "#!/usr/bin/env node" }],
  },
];
