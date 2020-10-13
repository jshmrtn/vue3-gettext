import Vue from "vue/types/vue";

declare module "vue/types/vue" {
  interface ILanguageComponent extends Vue {
    available: {
      [key: string]: string;
    };
    current: string;
  }

  interface Vue {
    $gettextPlugin: ILanguageComponent;
    $gettext: (msgid: string) => string;
    $pgettext: (context: string, msgid: string) => string;
    $ngettext: (msgid: string, plural: string, n: number) => string;
    $npgettext: (context: string, msgid: string, plural: string, n: number) => string;
    $gettextInterpolate: (msgid: string, context: object, disableHtmlEscaping?: boolean) => string;
  }
}
