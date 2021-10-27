import markdownitfence from "markdown-it-fence";
import { PluginConfig } from "vuepress";
import path from "path";

function vueLiveMarkdownPlugin(md, _options) {
  return markdownitfence(md, "jm-vue-live", {
    render: function (tokens, idx) {
      const content = tokens[idx].content;
      return `<VueLiveWrapper code="${escape(content)}"></VueLiveWrapper>`;
    },
    validate: function (params) {
      return params.trim().match(/^vue live$/);
    },
  });
}

export default {
  name: "vue-live-markdown-plugin",
  multiple: false,
  extendsMarkdown: (md) => {
    md.use(vueLiveMarkdownPlugin);
  },
  clientAppEnhanceFiles: [path.resolve(__dirname, "./enhanceAppFile.ts")],
} as PluginConfig;
