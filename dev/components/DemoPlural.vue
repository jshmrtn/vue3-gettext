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
      {{ _n('%{ n } book', '%{ n } books', n, { n }) }}
    </p>
    <p>
      computed:
      <translate class="translated" :translate-n="nComputed" translate-plural="%{ nComputed } books">
        %{ nComputed } book
      </translate>
    </p>

    <p>
      <translate class="translated">
        Use default singular or plural form when there is no translation. This is left untranslated on purpose.
      </translate>
    </p>
    <p>
      <translate class="translated" :translate-n="countForUntranslated"
        translate-plural="%{ countForUntranslated } items. This is left untranslated on purpose.">
        %{ countForUntranslated } item. This is left untranslated on purpose.
      </translate>
    </p>
  </div>
</template>

<script>
import { gettext } from "../i18n";
export default {
  setup: () => {
    const _n = gettext.$ngettext.bind(this);
    return { _n };
  },
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
