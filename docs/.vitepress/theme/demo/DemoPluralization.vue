<template>
  <div class="pluralization">
    <DemoBox>
      {{ $ngettext("I have %{count} book.", "I have %{count} books.", count, { count }) }}
    </DemoBox>
    <h5>Set count:</h5>
    <div class="controls">
      <VPButton @click="decrease()" text="-" />
      {{ count }}
      <VPButton @click="increase()" text="+" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VPButton } from "vitepress/theme";
import DemoBox from "./DemoBox.vue";

const count = ref(0);

const decrease = () => {
  if (count.value === 0) return;
  count.value -= 1;
};

const increase = () => {
  count.value += 1;
};
</script>

<style scoped>
.pluralization {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
