<template>
  <language-select></language-select>

  <div :class="$style.container">
    <div :class="$style.tile">
      <h2>Alert</h2>
      <Alert></Alert>
    </div>

    <div :class="$style.tile">
      <h2>Plural</h2>
      <Plural></Plural>
    </div>

    <div :class="$style.tile">
      <h2>Filter</h2>
      <DateFormat></DateFormat>
    </div>
    <div :class="$style.tile">
      <h2>Custom tags</h2>
      <CustomTags></CustomTags>
    </div>
    <div :class="$style.tile">
      <h2>Multilines</h2>
      <Multilines></Multilines>
    </div>
    <div :class="$style.tile">
      <h2>Directive</h2>
      <Directive></Directive>
    </div>
    <div :class="$style.tile">
      <h2>If</h2>
      <If></If>
    </div>
  </div>
</template>

<script>
import Alert from "./components/alert.vue";
import CustomTags from "./components/customTags.vue";
import Directive from "./components/directive.vue";
import If from "./components/if.vue";
import LanguageSelect from "./components/languageSelect.vue";
import DateFormat from "./components/dateFormat.vue";
import Multilines from "./components/multilines.vue";
import Plural from "./components/plural.vue";

export default {
  name: "App",
  components: {
    Alert,
    CustomTags,
    Directive,
    If,
    LanguageSelect,
    DateFormat,
    Multilines,
    Plural,
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

  h2 {
    margin-top: 0;
  }
}
</style>
