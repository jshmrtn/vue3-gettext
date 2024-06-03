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

<script>
export default {
  data: () => ({
    n: 0,
    countForUntranslated: 10,
  }),
  computed: {
    nComputed() {
      return this.n;
    },
  },
  methods: {
    decrease() {
      if (this.n === 0) return;
      this.n -= 1;
    },
    increase() {
      this.n += 1;
    },
  },
};
</script>
