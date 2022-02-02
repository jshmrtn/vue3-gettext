<template>
  <language-select></language-select>

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
      <h2>Filter</h2>
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
import LanguageSelect from "./components/languageSelect.vue";

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
};
</script>

<style module>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 15px;
}

.tile {
  background-color: white;
  padding: 15px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.02);
  border-radius: 2px;
}

h2 {
  margin-top: 0;
}
</style>
