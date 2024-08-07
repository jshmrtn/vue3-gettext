---
pageClass: demoPage
aside: false
---

<script setup>
import { VPButton } from "vitepress/theme";
import { useGettext } from "../src/index";
import LanguageSelect from "./.vitepress/theme/demo/LanguageSelect.vue";
import DemoBox from "./.vitepress/theme/demo/DemoBox.vue";
import DemoPluralization from "./.vitepress/theme/demo/DemoPluralization.vue";
import DemoParams from "./.vitepress/theme/demo/DemoParams.vue";
import { computed } from "vue";
const { $gettext, $ngettext } = useGettext();

const item = computed(() => ({
  label: $gettext("Headline 1"),
}));
</script>

# Demo

<style>
.translated {
  border-radius: 0.25rem;
  background-color: rgba(241, 245, 17, 0.1);
  border: 1px solid rgba(241, 245, 17, 0.5);
  padding: 0 0.5rem;
}

.demoPage .content {
  container-type: inline-size;
}

.section {
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  @container (width > 860px) {
    grid-template-columns: 1fr 1fr;
  }
  grid-template-rows: 1fr;
  gap: 1rem;
  overflow: hidden;

  > div[class*='language-'] {
    margin: 0;
  }
}

</style>

<ClientOnly>
  <LanguageSelect />
</ClientOnly>

### Simple translation

  <div class="section">

```vue
<template>
  {{ $gettext("Headline 1") }}
</template>
```

  <ClientOnly>
    <DemoBox>
      {{ $gettext("Headline 1") }}
    </DemoBox>
  </ClientOnly>

  </div>
  
### Parameters

<div class="section">

```vue
<template>
  {{ $gettext("Headline 1") }}
</template>
```

<ClientOnly>
  <DemoParams />
</ClientOnly>

</div>

### Pluralized

<div class="section">

<!-- prettier-ignore-start -->
```ts
$ngettext("%{count} book", "%{count} books", 
  count, { count }
);
```
<!-- prettier-ignore-end -->

<DemoPluralization />

</div>

### In code sections/files

<div class="section">

```vue
<script>
import { computed } from "vue";
import { useGettext } from "vue3-gettext";

const { $gettext, $ngettext } = useGettext();

const item = computed(() => ({
  label: $gettext("Headline 1"),
}));
</script>

<template>
  {{ item.label }}
</template>
```

<DemoBox>
  {{ item.label }}
</DemoBox>

</div>
