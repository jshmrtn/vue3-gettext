import { defineConfig } from "vitepress";

export default defineConfig({
  title: "vue3-gettext",
  description: "Translate Vue applications with gettext",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    sidebar: [
      {
        text: "Getting started",
        items: [
          { link: "/demo.md", text: "Demo" },
          { link: "/demo.md", text: "Quick start guide" },
        ],
      },
      {
        text: "Setup",
        link: "/setup.md",
        items: [
          { link: "/setup.md", text: "Installation" },
          { link: "/extraction.md", text: "Message extraction" },
          { link: "/configuration.md", text: "Configuration" },
        ],
      },
      {
        text: "Usage",
        link: "/functions.md",
        items: [{ link: "/functions.md", text: "Functions" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/jshmrtn/vue3-gettext/" }],
  },
});
