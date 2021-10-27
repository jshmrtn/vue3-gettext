<template>
  <div style="display: flex; gap: 0.5rem">
    <button
      :class="[$style.button, { [$style.active]: key === currentLanguage }]"
      v-for="(name, key) in languages"
      :key="key"
      @click="setLanguage(key)"
    >
      {{ name }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useGettext } from "/@gettext/";

export default defineComponent({
  setup() {
    const gettext = useGettext();

    const languages = computed(() => gettext.available);
    const currentLanguage = computed(() => gettext.current);
    const setLanguage = (lang: string) => {
      gettext.current = lang;
    };

    return {
      languages,
      setLanguage,
      currentLanguage,
    };
  },
});
</script>

<style lang="scss" module>
.button {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }

  &.active {
    background-color: black;
    color: white;
  }
}
</style>
