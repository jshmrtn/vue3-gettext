<template>
  <div class="results">
    <div class="sectionLabel">Output</div>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.results {
  background-color: var(--vp-c-default-3);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 1rem;
  padding-top: 0.5rem;

  .sectionLabel {
    font-size: 12px;
    border-bottom: 1px solid var(--vp-c-default-1);
    margin-bottom: 0.5rem;
  }
}
</style>
