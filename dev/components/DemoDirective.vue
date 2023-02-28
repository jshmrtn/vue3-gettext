<template>
  <div>
    <!-- No binding: static interpolation. -->
    <p v-translate="{ random }" class="translated">A <b>random</b> number: <i>%{ random }</i></p>

    <!-- Singular with a dynamic binding. -->
    <p>
      <input v-model="name" type="text" />
      <span v-translate="{ name }" class="translated">Hello <strong>%{ name }</strong></span>
    </p>

    <!-- Plural with a dynamic binding. -->
    <p>
      <button @click="decrease()">-</button>
      <span
        v-translate="{ count }"
        class="translated"
        :translate-n="count"
        translate-plural="<strong>%{ count }</strong> apples"
      >
        <strong>%{ count }</strong> apple
      </span>
      <button @click="increase()">+</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("Bryan");
const count = ref(0);
const random = Math.random();

const decrease = () => {
  if (count.value === 0) return;
  count.value -= 1;
};

const increase = () => {
  count.value += 1;
};
</script>
