<template>
  <div>
    <p>
      <!-- Test $gettext in JavaScript code. -->
      <button @click="alert">gettext in JavaScript</button>
    </p>
    <p>
      <!-- Test $ngettext in JavaScript code with interpolation. -->
      <button @click="decrease()">-</button>
      {{ n }}
      <button @click="increase()">+</button>
      <button @click="alertPlural(n)">ngettext in JavaScript</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGettext } from "vue3-gettext";

const { $gettext: __, $ngettext: _n } = useGettext();

const n = ref(2);

const alert = () => {
  const msg = __("Good bye!"); // use jsExtractorOpts in gettext.config.js to extract custom keywords
  return window.alert(msg);
};

const decrease = () => {
  if (n.value === 0) return;
  n.value -= 1;
};

const increase = () => {
  n.value += 1;
};

const alertPlural = (n: number) => {
  const msg = _n("%{ n } car", "%{ n } cars", n, { n: `${n}` });
  return window.alert(msg);
};
</script>
