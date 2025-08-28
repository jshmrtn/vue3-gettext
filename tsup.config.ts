import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    clean: true,
    dts: true,
    format: ["esm"],
  },
  {
    entry: ["scripts/gettext_extract.ts"],
    clean: true,
    external: ["typescript"],
    format: ["esm"],
  },
  {
    entry: ["scripts/gettext_compile.ts"],
    clean: true,
    format: ["esm"],
  },
]);
