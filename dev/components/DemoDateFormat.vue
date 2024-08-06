<template>
  <p class="translated">
    {{ dateFormat(new Date()) }}
  </p>
</template>

<script setup lang="ts">
import { useGettext } from "vue3-gettext";
import { format } from "date-fns";
import en from "date-fns/locale/en-US/index";
import fr from "date-fns/locale/fr/index";
import it from "date-fns/locale/it/index";
import zh from "date-fns/locale/zh-CN/index";

const dateFormat = (value: Date) => {
  const gettext = useGettext();
  const locales = { en, fr, it, zh };
  const locale = locales[gettext.current.toLowerCase().split("_")[0] as keyof typeof locales];
  return format(value, "EEEE d LLLL HH:mm:ss", { locale });
};
</script>
