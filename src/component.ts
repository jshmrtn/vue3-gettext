import translate from "./translate";
import { Component, h, computed, SetupContext, ref, onMounted, Ref, getCurrentInstance, defineComponent } from "vue";
import interpolate from "./interpolate";
import { useGettext } from ".";

/**
 * Translate content according to the current language.
 */
export default defineComponent({
  // eslint-disable-next-line vue/component-definition-name-casing
  name: "translate",
  props: {
    tag: {
      type: String,
      default: "span",
    },
    // Always use v-bind for dynamically binding the `translateN` prop to data on the parent,
    // i.e.: `:translateN`.
    translateN: {
      type: Number,
      default: null,
    },
    translatePlural: {
      type: String,
      default: null,
    },
    translateContext: {
      type: String,
      default: null,
    },
    translateParams: {
      type: Object,
      default: null,
    },
    // `translateComment` is used exclusively by `easygettext`'s `gettext-extract`.
    translateComment: {
      type: String,
      default: null,
    },
  },

  setup(props: any, context: SetupContext<any>) {
    const isPlural = props.translateN !== undefined && props.translatePlural !== undefined;
    if (!isPlural && (props.translateN || props.translatePlural)) {
      throw new Error(
        `\`translate-n\` and \`translate-plural\` attributes must be used together: ${
          context.slots.default()[0]?.children
        }.`,
      );
    }

    const root = ref(null);

    const plugin = useGettext();
    const msgid: Ref<string> = ref(null);

    onMounted(() => {
      if (!msgid.value) {
        msgid.value = root.value.innerHTML;
      }
    });

    const translation = computed(() => {
      let translatedMsg = translate(plugin).getTranslation(
        msgid.value,
        props.translateN || undefined,
        props.translateContext,
        isPlural ? props.translatePlural : null,
        plugin.current,
      );

      return interpolate(plugin)(translatedMsg, props.translateParams, getCurrentInstance()?.parent);
    });

    // The text must be wraped inside a root HTML element, so we use a <span> (by default).
    // https://github.com/vuejs/vue/blob/a4fcdb/src/compiler/parser/index.js#L209
    return () => {
      if (!msgid.value) {
        return h(props.tag, { ref: root }, context.slots.default ? context.slots.default() : "");
      }
      return h(props.tag, { ref: root, innerHTML: translation.value });
    };
  },
});
