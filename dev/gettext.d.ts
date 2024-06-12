export {};
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    __: ComponentCustomProperties["$gettext"];
    _x: ComponentCustomProperties["$pgettext"];
    _n: ComponentCustomProperties["$ngettext"];
    _xn: ComponentCustomProperties["$npgettext"];
  }
}
