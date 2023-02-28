<template>
  <div>
    <p>
      <translate class="translated">Select your language:</translate>
    </p>
    <button
      v-for="(name, key) in language.available"
      :key="key"
      :class="$style.button"
      @click="language.current = key as string"
    >
      {{ name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGettext } from "vue3-gettext";

const language = useGettext();
</script>

<style lang="scss" module>
.button {
  margin-right: 0.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}
</style>
