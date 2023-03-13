import { IJsExtractorOptions } from "gettext-extractor/dist/js/extractors/common";
import { App, UnwrapRef, WritableComputedRef } from "vue";
import type { Component as ComponentType } from "./component";
import directive from "./directive";

export type TranslateComponent = typeof ComponentType;
export type TranslateDirective = ReturnType<typeof directive>;

export const GetTextSymbol = Symbol("GETTEXT");

export type Message = string | string[];

export type MessageContext = {
  [context: string]: Message;
};

export type LanguageData = {
  [messageId: string]: Message | MessageContext;
};

export type Translations = {
  [language: string]: LanguageData;
};

export interface GetTextOptions {
  availableLanguages: { [key: string]: string };
  defaultLanguage: string;
  sourceCodeLanguage?: string; // if set, use it to calculate plural form when a msgid is not translated.
  mutedLanguages: Array<string>;
  silent: boolean;
  translations: Translations;
  setGlobalProperties: boolean;
  globalProperties: {
    language?: Array<string>;
    gettext?: Array<string>;
    pgettext?: Array<string>;
    ngettext?: Array<string>;
    npgettext?: Array<string>;
    interpolate?: Array<string>;
  };
  provideDirective: boolean;
  provideComponent: boolean;
}

export type Language = UnwrapRef<{
  available: GetTextOptions["availableLanguages"];
  muted: GetTextOptions["mutedLanguages"];
  silent: GetTextOptions["silent"];
  translations: WritableComputedRef<GetTextOptions["translations"]>;
  current: string;
  sourceCodeLanguage?: string; // if set, use it to calculate plural form when a msgid is not translated.
  $gettext: (msgid: string, parameters?: { [key: string]: string }, disableHtmlEscaping?: boolean) => string;
  $pgettext: (
    context: string,
    msgid: string,
    parameters?: { [key: string]: string },
    disableHtmlEscaping?: boolean,
  ) => string;
  $ngettext: (
    msgid: string,
    plural: string,
    n: number,
    parameters?: { [key: string]: string },
    disableHtmlEscaping?: boolean,
  ) => string;
  $npgettext: (
    context: string,
    msgid: string,
    plural: string,
    n: number,
    parameters?: { [key: string]: string },
    disableHtmlEscaping?: boolean,
  ) => string;
  interpolate: (msgid: string, context: object, disableHtmlEscaping?: boolean) => string;
  install: (app: App) => void;
  directive: TranslateDirective;
  component: TranslateComponent;
}>;

export interface GettextConfig {
  input: {
    /** only files in this directory are considered for extraction */
    path: string;
    /** glob patterns to select files for extraction */
    include: string[];
    /** glob patterns to exclude files from extraction */
    exclude: string[];
    /** js extractor options, for custom extractor keywords */
    jsExtractorOpts?: {
      keyword: string;
      options: IJsExtractorOptions;
    }[];
    compileTemplate: boolean;
  };
  output: {
    path: string;
    locales: string[];
    potPath: string;
    jsonPath: string;
    flat: boolean;
    linguas: boolean;
    splitJson: boolean;
  };
}

export interface GettextConfigOptions {
  input?: Partial<GettextConfig["input"]>;
  output?: Partial<GettextConfig["output"]>;
}

declare module "vue" {
  interface ComponentCustomProperties extends Pick<Language, "$gettext" | "$pgettext" | "$ngettext" | "$npgettext"> {
    $language: Language;
    $gettextInterpolate: Language["interpolate"];
  }

  interface GlobalComponents {
    translate: TranslateComponent;
  }

  interface GlobalDirectives {
    vTranslate: TranslateDirective;
  }
}
