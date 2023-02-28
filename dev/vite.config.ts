import * as path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./"),
      "vue3-gettext": path.resolve(__dirname, "../src/index"),
    },
  },
});
