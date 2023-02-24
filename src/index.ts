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
  globalProperties: {
    language: ["$language"],
    gettext: ["$gettext"],
    pgettext: ["$pgettext"],
    ngettext: ["$ngettext"],
    npgettext: ["$npgettext"],
    interpolate: ["$gettextInterpolate"],
  },
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
        let properties = mergedOptions.globalProperties.gettext || ["$gettext"];
        properties.forEach((p) => {
          globalProperties[p] = gettext.$gettext;
        });
        properties = mergedOptions.globalProperties.pgettext || ["$pgettext"];
        properties.forEach((p) => {
          globalProperties[p] = gettext.$pgettext;
        });
        properties = mergedOptions.globalProperties.ngettext || ["$ngettext"];
        properties.forEach((p) => {
          globalProperties[p] = gettext.$ngettext;
        });
        properties = mergedOptions.globalProperties.npgettext || ["$npgettext"];
        properties.forEach((p) => {
          globalProperties[p] = gettext.$npgettext;
        });
        properties = mergedOptions.globalProperties.interpolate || ["$gettextInterpolate"];
        properties.forEach((p) => {
          globalProperties[p] = gettext.interpolate;
        });
        properties = mergedOptions.globalProperties.language || ["$language"];
        properties.forEach((p) => {
          globalProperties[p] = gettext;
        });
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
