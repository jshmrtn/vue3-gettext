import { App, Directive, UnwrapRef, WritableComputedRef } from "vue";
import type { Component } from "./component";

export type ComponentType = typeof Component;

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
  mutedLanguages: Array<string>;
  silent: boolean;
  translations: Translations;
  setGlobalProperties: boolean;
  provideDirective: boolean;
  provideComponent: boolean;
}

export type Language = UnwrapRef<{
  available: GetTextOptions["availableLanguages"];
  muted: GetTextOptions["mutedLanguages"];
  silent: GetTextOptions["silent"];
  translations: WritableComputedRef<GetTextOptions["translations"]>;
  current: string;
  $gettext: (msgid: string) => string;
  $pgettext: (context: string, msgid: string) => string;
  $ngettext: (msgid: string, plural: string, n: number) => string;
  $npgettext: (context: string, msgid: string, plural: string, n: number) => string;
  interpolate: (msgid: string, context: object, disableHtmlEscaping?: boolean) => string;
  install: (app: App) => void;
  directive: Directive;
  component: ComponentType;
}>;

export interface GettextConfig {
  input: {
    /** only files in this directory are considered for extraction */
    path: string;
    /** glob patterns to select files for extraction */
    include: string[];
    /** glob patterns to exclude files from extraction */
    exclude: string[];
  };
  output: {
    path: string;
    locales: string[];
    potPath: string;
    jsonPath: string;
    flat: boolean;
    linguas: boolean;
  };
}

export interface GettextConfigOptions {
  input?: Partial<GettextConfig["input"]>;
  output?: Partial<GettextConfig["output"]>;
}
