<template>
  <div>
    <div class="label">
      {{ $gettext("Select your language:") }}
    </div>
    <div class="buttons">
      <VPButton
        :text="name"
        v-for="(name, key) in language.available"
        :key="key"
        @click="language.current = String(key)"
        :theme="language.current === key ? undefined : 'alt'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VPButton } from "vitepress/theme";
import { useGettext } from "../../../../src/index";

const language = useGettext();
</script>

<style scoped>
.label {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
