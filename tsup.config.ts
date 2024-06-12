import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    clean: true,
    dts: true,
    format: ["cjs", "esm"],
  },
  {
    entry: ["scripts/gettext_extract.ts"],
    clean: true,
    external: ["typescript"],
    format: ["cjs"],
  },
  {
    entry: ["scripts/gettext_compile.ts"],
    clean: true,
    format: ["cjs"],
  },
]);
