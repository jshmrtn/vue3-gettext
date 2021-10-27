<template>
  <ClientOnly>
    <VueLive :layout="VueLiveLayout" :code="unescapedCode"></VueLive>
  </ClientOnly>
</template>

<script lang="ts">
import { ref, markRaw, defineComponent } from "vue";
import { VueLive } from "vue-live";
import "vue-live/lib/vue-live.esm.css";

import VueLiveLayout from "./VueLiveLayout.vue";
export default defineComponent({
  name: "VueLiveWrapper",
  components: { VueLive },
  props: {
    code: {
      required: true,
    },
  },
  setup({ code }) {
    const unescapedCode = ref(unescape(code));

    return { VueLiveLayout: markRaw(VueLiveLayout), unescapedCode };
  },
});
</script>

<style module lang="scss"></style>
