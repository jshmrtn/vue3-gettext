<template>
  <p class="translated">
    {{ dateFormat(dateNow) }}
  </p>
</template>

<script>
import { format } from "date-fns";
import en from "date-fns/locale/en-US";
import fr from "date-fns/locale/fr";
import it from "date-fns/locale/it";
import zh from "date-fns/locale/zh-CN";
import { useGettext } from "/@gettext/";

export default {
  data: () => ({
    dateNow: new Date(),
  }),
  methods: {
    dateFormat: (value, formatString) => {
      const gettext = useGettext();
      const locales = { en, fr, it, zh };
      const locale = locales[gettext.current.toLowerCase().split("_")[0]];
      return format(value, formatString ? formatString : "EEEE d LLLL HH:mm:ss", { locale });
    },
  },
};
</script>
