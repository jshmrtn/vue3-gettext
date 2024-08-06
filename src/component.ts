import { computed, defineComponent, getCurrentInstance, h, onMounted, ref } from "vue";
import interpolate from "./interpolate.js";
import translate from "./translate.js";
import { useGettext } from "./utilities.js";

/**
 * Translate content according to the current language.
 * @deprecated
 */
export const Component = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names, vue/component-definition-name-casing
  name: "translate",
  props: {
    tag: {
      type: String,
      default: "span",
    },
    // Always use v-bind for dynamically binding the `translateN` prop to data on the parent,
    // i.e.: `:translate-n`.
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
    translateComment: {
      type: String,
      default: null,
    },
  },

  setup(props, context) {
    const isPlural = props.translateN !== undefined && props.translatePlural !== undefined;
    if (!isPlural && (props.translateN || props.translatePlural)) {
      throw new Error(
        `\`translate-n\` and \`translate-plural\` attributes must be used together: ${
          context.slots.default?.()[0]?.children
        }.`,
      );
    }

    const root = ref<HTMLElement>();

    const plugin = useGettext();
    const msgid = ref<string | null>(null);

    onMounted(() => {
      if (!msgid.value && root.value) {
        msgid.value = root.value.innerHTML.trim();
      }
    });

    const translation = computed(() => {
      const translatedMsg = translate(plugin).getTranslation(
        msgid.value!,
        props.translateN,
        props.translateContext,
        isPlural ? props.translatePlural : null,
        plugin.current,
      );

      return interpolate(plugin)(translatedMsg, props.translateParams, undefined, getCurrentInstance()?.parent);
    });

    // The text must be wraped inside a root HTML element, so we use a <span> by default.
    return () => {
      if (!msgid.value) {
        return h(props.tag, { ref: root }, context.slots.default ? context.slots.default() : "");
      }
      return h(props.tag, { ref: root, innerHTML: translation.value });
    };
  },
});

export default Component;
