<template>
  <div>
    <p>
      <translate>Select your language:</translate>
    </p>
    <button v-for="(name, key) in language.available" :key="key" :class="$style.button" @click="language.current = key">
      {{ name }}
    </button>
  </div>
</template>

<script>
import { useGettext } from "/@gettext/";

export default {
  setup() {
    const language = useGettext();

    return {
      language,
    };
  },
};
</script>

<style lang="scss" module>
.button {
  margin-right: 0.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}
</style>
