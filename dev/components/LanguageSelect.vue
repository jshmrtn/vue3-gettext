<template>
  <div>
    <p class="translated">
      {{ $gettext("Select your language:") }}
    </p>
    <div :class="$style.buttons">
      <button
        v-for="(name, key) in language.available"
        :key="key"
        :class="$style.button"
        @click="language.current = String(key)"
      >
        {{ name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGettext } from "../../src/index";

const language = useGettext();
</script>

<style lang="scss" module>
.buttons {
  display: flex;
  gap: 0.25rem;

  .button {
    margin-right: 0.5rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }
}
</style>
