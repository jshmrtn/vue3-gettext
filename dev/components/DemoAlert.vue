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

<script>
export default {
  data: () => ({
    n: 2,
  }),
  methods: {
    alert() {
      // custom method name
      const __ = this.$gettext.bind(this);
      // use jsExtractorOpts in gettext.config.js
      // to custom keywords
      const msg = __("Good bye!");
      return window.alert(msg);
    },
    decrease() {
      if (this.n === 0) return;
      this.n -= 1;
    },
    increase() {
      this.n += 1;
    },
    alertPlural(n) {
      const _n = this.$ngettext.bind(this);
      const msg = _n("%{ n } car", "%{ n } cars", n, { n });
      return window.alert(msg);
    },
  },
};
</script>
