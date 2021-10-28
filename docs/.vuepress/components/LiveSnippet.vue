<template>
  <VueLiveWrapper :code="code"></VueLiveWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

const snippetCtx = import.meta.globEager("../snippets/**/*.html");

const snippetMap: { [index: string]: any } = {};
for (const path in snippetCtx) {
  snippetMap[path.replace("../snippets/", "").replace(".html", "")] = path;
}

export default defineComponent({
  props: {
    snippet: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const code = computed(() => {
      try {
        return snippetCtx[snippetMap[props.snippet]].default;
      } catch (e) {
        console.error("Snippet not found: " + props.snippet);
        return "";
      }
    });

    return { code };
  },
});
</script>
