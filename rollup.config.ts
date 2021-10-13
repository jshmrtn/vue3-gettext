import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const extensions = [".js", ".ts"];

export default [
  {
    input: "src/index.ts",
    external: ["vue"],
    plugins: [terser(), resolve({ extensions }), typescript({ sourceMap: true })],
    output: [
      { sourcemap: true, file: pkg.main, format: "cjs" },
      { sourcemap: true, file: pkg.module, format: "es" },
    ],
  },
  {
    input: "src/index.ts",
    external: ["vue"],
    plugins: [dts()],
    output: [{ sourcemap: true, file: pkg.types, format: "es" }],
  },
  {
    input: "scripts/gettext_compile.ts",
    external: ["glob", "cosmiconfig"],
    plugins: [resolve({ preferBuiltins: true }), typescript()],
    output: [{ file: pkg.bin["vue-gettext-compile"], format: "cjs", banner: "#!/usr/bin/env node" }],
  },
  {
    input: "scripts/gettext_extract.ts",
    external: ["glob", "cosmiconfig"],
    plugins: [resolve({ preferBuiltins: true }), typescript()],
    output: [{ file: pkg.bin["vue-gettext-extract"], format: "cjs", banner: "#!/usr/bin/env node" }],
  },
];
