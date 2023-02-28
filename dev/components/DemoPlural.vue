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
      data:
      <translate class="translated" :translate-params="{ n }" :translate-n="n" translate-plural="%{ n } books"
        >%{ n } book</translate
      >
    </p>

    <p>
      <translate>
        Use default singular or plural form when there is no translation. This is left untranslated on purpose.
      </translate>
    </p>
    <p>
      <translate
        :translate-n="countForUntranslated"
        :translate-params="{ countForUntranslated }"
        translate-plural="%{ countForUntranslated } items. This is left untranslated on purpose."
      >
        %{ countForUntranslated } item. This is left untranslated on purpose.
      </translate>
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
