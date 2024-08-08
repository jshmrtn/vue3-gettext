import { App, UnwrapRef, WritableComputedRef } from "vue";

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
}

type Separator = " ";

type Trim<T extends string, Acc extends string = ""> = T extends `${infer Char}${infer Rest}`
  ? Char extends Separator
    ? Trim<Rest, Acc>
    : Trim<Rest, `${Acc}${Char}`>
  : T extends ""
    ? Acc
    : never;

type ParameterKeys<TString extends string> = TString extends `${infer _}%{${infer Key}}${infer Rest}`
  ? Trim<Key> | ParameterKeys<Rest>
  : never;

export type Parameters<TString extends string> = Record<ParameterKeys<TString>, string | number>;

export type Language = UnwrapRef<{
  available: GetTextOptions["availableLanguages"];
  muted: GetTextOptions["mutedLanguages"];
  silent: GetTextOptions["silent"];
  translations: WritableComputedRef<GetTextOptions["translations"]>;
  current: string;
  /** if set, use it to calculate plural form when a msgid is not translated.
   * Default is 'en'.
   */
  sourceCodeLanguage?: string;
  $gettext: <TString extends string>(msgid: TString, parameters?: Parameters<TString>) => string;
  $pgettext: <TString extends string>(context: string, msgid: TString, parameters?: Parameters<TString>) => string;
  $ngettext: <TSingular extends string, TPlural extends string>(
    msgid: TSingular,
    plural: TPlural,
    n: number,
    parameters?: Parameters<TSingular> & Parameters<TPlural>,
  ) => string;
  $npgettext: <TSingular extends string, TPlural extends string>(
    context: string,
    msgid: TSingular,
    plural: TPlural,
    n: number,
    parameters?: Parameters<TSingular> & Parameters<TPlural>,
  ) => string;
  interpolate: (msgid: string, context: object) => string;
  install: (app: App) => void;
}>;

export type KeywordMapping = {
  /** @default $gettext */
  simple?: string[];
  /** @default $ngettext */
  plural?: string[];
  /** @default $npgettext */
  ctxPlural?: string[];
  /** @default $pgettext */
  ctx?: string[];
};

type ParserOptions =
  | {
      /** extract different keywords */
      mapping: KeywordMapping;
      /** doesn't merge your custom keywords with the default values */
      overrideDefaultKeywords: true;
    }
  | {
      /** extract different keywords */
      mapping?: KeywordMapping;
      /** doesn't merge your custom keywords with the default values */
      overrideDefaultKeywords: false;
    };

export interface GettextConfig {
  input: {
    /** only files in this directory are considered for extraction */
    path: string;
    /** glob patterns to select files for extraction */
    include: string[];
    /** glob patterns to exclude files from extraction */
    exclude: string[];
    /** parser options */
    parserOptions?: ParserOptions;
  };
  output: {
    path: string;
    locales: string[];
    potPath: string;
    jsonPath: string;
    flat: boolean;
    linguas: boolean;
    splitJson: boolean;
    fuzzyMatching: boolean;
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
}
