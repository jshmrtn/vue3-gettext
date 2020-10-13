import Component from "./component";
import Directive from "./directive";
import interpolateRaw from "./interpolate";
import translateRaw from "./translate";
import { reactive, App, inject, computed, UnwrapRef, WritableComputedRef } from "vue";
import { normalizeTranslations } from "./utils";

export interface GetTextOptions {
  availableLanguages: { [key: string]: string };
  defaultLanguage: string;
  mixins: { [key: string]: (language: Language) => any }; // TODO: type
  mutedLanguages: Array<string>;
  silent: boolean;
  translations: { [key: string]: { [key: string]: any } };
}

const defaultOptions: GetTextOptions = {
  availableLanguages: { en_US: "English" },
  defaultLanguage: "en_US",
  mixins: {},
  mutedLanguages: [],
  silent: false,
  translations: {},
};

export const GetTextSymbol = Symbol("GETTEXT");

export type Language = UnwrapRef<{
  available: GetTextOptions["availableLanguages"];
  muted: GetTextOptions["mutedLanguages"];
  silent: GetTextOptions["silent"];
  translations: WritableComputedRef<WritableComputedRef<GetTextOptions["translations"]>>;
  current: string;
  gettext: (msgid: string) => string;
  pgettext: (context: string, msgid: string) => string;
  ngettext: (msgid: string, plural: string, n: number) => string;
  npgettext: (context: string, msgid: string, plural: string, n: number) => string;
  gettextInterpolate: (msgid: string, context: object, disableHtmlEscaping?: boolean) => string;
  install: (app: App) => void;
}>;

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

  let translations = reactive({ value: normalizeTranslations(mergedOptions.translations) });
  // TODO: type
  const gettext: Language = (reactive({
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
      app[GetTextSymbol] = gettext;
      app.provide(GetTextSymbol, gettext);

      const globalProperties = app.config.globalProperties;

      globalProperties.$gettext = gettext.gettext;
      globalProperties.$pgettext = gettext.pgettext;
      globalProperties.$ngettext = gettext.ngettext;
      globalProperties.$npgettext = gettext.npgettext;
      globalProperties.$gettextInterpolate = gettext.gettextInterpolate;
      globalProperties.$language = gettext;

      app.directive("translate", Directive(gettext));
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component("translate", Component);
    },
  }) as unknown) as Language;

  Object.keys(mergedOptions.mixins).forEach((key) => (gettext[key] = mergedOptions.mixins[key](gettext)));

  const translate = translateRaw(gettext);
  const interpolate = interpolateRaw(gettext);
  gettext.gettext = translate.gettext.bind(translate);
  gettext.pgettext = translate.pgettext.bind(translate);
  gettext.ngettext = translate.ngettext.bind(translate);
  gettext.npgettext = translate.npgettext.bind(translate);
  gettext.gettextInterpolate = interpolate.bind(interpolate);

  return gettext;
}

export const useGettext = (): Language => inject(GetTextSymbol);
