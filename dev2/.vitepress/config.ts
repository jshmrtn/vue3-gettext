import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue3-gettext",
  description: "TODO",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { link: "/demo.md", text: "Demo" },
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
          {
            text: "Translation",
            link: "/translation.md",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
