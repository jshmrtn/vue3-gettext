<template>
  <div>
    <p>
      <translate>Select your language:</translate>
    </p>
    <button v-for="(name, key) in language.available" :key="key" @click="language.current = key">
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
