<template>
  <div>
    <p>
      <translate class="translated">In English, '0' (zero) is always plural.</translate>
    </p>
    <p>
      <button @click="decrease()">-</button>
      {{ n }}
      <button @click="increase()">+</button>
    </p>
    <p>
      <span class="translated">{{ $ngettext("%{ n } book", "%{ n } books", n, { n }) }}</span>
    </p>

    <p>Use default singular or plural form when there is no translation.</p>
    <p>
      <span class="translated">{{
        $ngettext(
          "%{ countForUntranslated } item. This is left untranslated on purpose.",
          "%{ countForUntranslated } items. This is left untranslated on purpose.",
          countForUntranslated,
          { countForUntranslated },
        )
      }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const countForUntranslated = 10;
const n = ref(0);

const decrease = () => {
  if (n.value === 0) return;
  n.value -= 1;
};

const increase = () => {
  n.value += 1;
};
</script>
