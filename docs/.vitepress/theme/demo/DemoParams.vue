<template>
  <div class="params">
    <DemoBox>
      {{ $gettext("%{name} is a good friend. My favorite number is %{favNum}.", { name, favNum: number }) }}
    </DemoBox>
    <div class="inputs">
      <label class="input">
        <span class="label">Name:</span>
        <input v-model="name" />
      </label>
      <label class="input">
        <span class="label">Number:</span>
        <input type="number" v-model="number" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DemoBox from "./DemoBox.vue";

const name = ref("Jane");
const number = ref(7);
</script>

<style scoped>
.params {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .input {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    .label {
      font-size: 12px;
      line-height: 14px;
    }

    input {
      border: 1px solid var(--vp-c-default-3);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
  }
}
</style>
