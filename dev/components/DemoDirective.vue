<template>
  <div>
    <p class="translated" v-html="$gettext('A <b>random</b> number: <i>%{ random }</i>', { random })"></p>

    <p>
      <input v-model="name" type="text" />
      <span class="translated" v-html="$gettext('Hello <strong>%{ name }</strong>', { name })"></span>
    </p>

    <p>
      <button @click="decrease()">-</button>
      <span
        class="translated"
        v-html="$ngettext('<strong>%{ count }</strong> apple', '<strong>%{ count }</strong> apples', count, { count })"
      >
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
