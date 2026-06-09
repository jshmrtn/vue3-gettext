import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";
import pkg from "./package.json" with { type: "json" };

// Externalize peer and runtime dependencies so consuming applications provide
// their own copy (most importantly Vue - bundling it causes duplicate Vue
// instances and broken reactivity in consumers).
const external = [...Object.keys(pkg.peerDependencies ?? {}), ...Object.keys(pkg.dependencies ?? {})];

export default defineConfig({
  input: "./src/index.ts",
  external,
  plugins: [dts()],
  output: [{ dir: "dist", format: "es" }],
});
