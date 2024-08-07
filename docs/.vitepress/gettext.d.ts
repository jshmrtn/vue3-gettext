import "vue";

declare module "vue" {
  interface ComponentCustomProperties {
    __: ComponentCustomProperties["$gettext"];
    _x: ComponentCustomProperties["$pgettext"];
    _n: ComponentCustomProperties["$ngettext"];
    _xn: ComponentCustomProperties["$npgettext"];
  }
}
