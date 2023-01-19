import { App, computed, reactive, ref } from "vue";
import Component from "./component";
import Directive from "./directive";
import interpolateRaw from "./interpolate";
import translateRaw from "./translate";
import type {
  GettextConfig,
  GettextConfigOptions,
  GetTextOptions,
  Language,
  LanguageData,
  Message,
  Translations,
} from "./typeDefs";
import { GetTextSymbol } from "./typeDefs";
import { normalizeTranslations } from "./utilities";

export { useGettext } from "./utilities";
export type { Language, Message, LanguageData, Translations, GettextConfig, GettextConfigOptions, GetTextOptions };

const defaultOptions: GetTextOptions = {
  /** all the available languages of your application. Keys must match locale names */
  availableLanguages: { en: "English" },
  defaultLanguage: "en",
  mutedLanguages: [],
  silent: false,
  translations: {},
  setGlobalProperties: true,
  provideDirective: true,
  provideComponent: true,
};

export function createGettext(options: Partial<GetTextOptions> = {}) {
  Object.keys(options).forEach((key) => {
    if (Object.keys(defaultOptions).indexOf(key) === -1) {
      throw new Error(`${key} is an invalid option for the translate plugin.`);
    }
  });

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const translations = ref(normalizeTranslations(mergedOptions.translations));

  const gettext: Language = reactive({
    available: mergedOptions.availableLanguages,
    muted: mergedOptions.mutedLanguages,
    silent: mergedOptions.silent,
    translations: computed({
      get: () => {
        return translations.value;
      },
      set: (val: GetTextOptions["translations"]) => {
        translations.value = normalizeTranslations(val);
      },
    }),
    current: mergedOptions.defaultLanguage,
    install(app: App) {
      // TODO: is this needed?
      (app as any)[GetTextSymbol] = gettext;
      app.provide(GetTextSymbol, gettext);

      if (mergedOptions.setGlobalProperties) {
        const globalProperties = app.config.globalProperties;
        globalProperties.$gettext = gettext.$gettext;
        globalProperties.$pgettext = gettext.$pgettext;
        globalProperties.$ngettext = gettext.$ngettext;
        globalProperties.$npgettext = gettext.$npgettext;
        globalProperties.$gettextInterpolate = gettext.interpolate;
        globalProperties.$language = gettext;
      }

      if (mergedOptions.provideDirective) {
        app.directive("translate", Directive(gettext));
      }
      if (mergedOptions.provideComponent) {
        // eslint-disable-next-line vue/multi-word-component-names, vue/component-definition-name-casing
        app.component("translate", Component);
      }
    },
  }) as unknown as Language;

  const translate = translateRaw(gettext);
  const interpolate = interpolateRaw(gettext);
  gettext.$gettext = translate.gettext.bind(translate);
  gettext.$pgettext = translate.pgettext.bind(translate);
  gettext.$ngettext = translate.ngettext.bind(translate);
  gettext.$npgettext = translate.npgettext.bind(translate);
  gettext.interpolate = interpolate.bind(interpolate);

  gettext.directive = Directive(gettext);
  gettext.component = Component;

  return gettext;
}

export const defineGettextConfig = (config: GettextConfigOptions) => {
  return config;
};
