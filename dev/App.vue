<template>
  <LanguageSelect></LanguageSelect>

  <div :class="$style.container">
    <div :class="$style.tile">
      <h2>Alert</h2>
      <DemoAlert></DemoAlert>
    </div>

    <div :class="$style.tile">
      <h2>Plural</h2>
      <DemoPlural></DemoPlural>
    </div>

    <div :class="$style.tile">
      <h2>Date</h2>
      <DemoDateFormat></DemoDateFormat>
    </div>
    <div :class="$style.tile">
      <h2>Custom tags</h2>
      <DemoCustomTags></DemoCustomTags>
    </div>
    <div :class="$style.tile">
      <h2>Multilines</h2>
      <DemoMultilines></DemoMultilines>
    </div>
    <div :class="$style.tile">
      <h2>Directive</h2>
      <DemoDirective></DemoDirective>
    </div>
    <div :class="$style.tile">
      <h2>If</h2>
      <DemoIf></DemoIf>
    </div>
  </div>
</template>

<script>
import DemoAlert from "./components/DemoAlert.vue";
import DemoCustomTags from "./components/DemoCustomTags.vue";
import DemoDateFormat from "./components/DemoDateFormat.vue";
import DemoDirective from "./components/DemoDirective.vue";
import DemoIf from "./components/DemoIf.vue";
import DemoMultilines from "./components/DemoMultilines.vue";
import DemoPlural from "./components/DemoPlural.vue";
import LanguageSelect from "./components/LanguageSelect.vue";
import { useGettext } from "/@gettext/";

export default {
  name: "App",
  components: {
    DemoAlert,
    DemoCustomTags,
    DemoDirective,
    DemoIf,
    DemoDateFormat,
    DemoMultilines,
    DemoPlural,
    LanguageSelect,
  },
  props: {
    lang: {
      type: String,
      default: 'en_GB',
    }
  },
  mounted() {
    const gettext = useGettext();
    gettext.current = this.lang;
  },
};
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 15px;

  button {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }

  .tile {
    margin-top: 2rem;
    margin-right: 2rem;

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
  }
}
</style>
