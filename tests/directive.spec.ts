import translations from "./json/directive";
import { mountWithPlugin } from "./utils";

const mount = mountWithPlugin({
  availableLanguages: {
    en_US: "American English",
    fr_FR: "Français",
  },
  defaultLanguage: "en_US",
  translations: translations,
  silent: false,
});

describe("translate directive tests", () => {
  it("works on empty strings", () => {
    const vm = mount({ template: "<div v-translate></div>" }).vm;
    expect(vm.$el.innerHTML).toEqual("");
  });

  it("returns an unchanged string when no translation is available for a language", () => {
    const warnSpy = jest.spyOn(console, "warn");
    const vm = mount({ template: "<div v-translate>Unchanged string</div>" }).vm;
    (vm as any).$gettextPlugin.current = "fr_BE";
    expect(vm.$el.innerHTML).toEqual("Unchanged string");
    expect(warnSpy).toHaveBeenCalledTimes(1);
    warnSpy.mockRestore();
  });

  it("returns an unchanged string when no translation key is available", () => {
    const warnSpy = jest.spyOn(console, "warn");
    const vm = mount({ template: "<div v-translate>Untranslated string</div>" }).vm;
    expect(vm.$el.innerHTML).toEqual("Untranslated string");
    expect(warnSpy).toHaveBeenCalledTimes(1);
    warnSpy.mockRestore();
  });

  it("translates known strings", async () => {
    const vm = mount({ template: "<div v-translate>Pending</div>" }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("En cours");
  });

  it("translates known strings when surrounded by one or more tabs and spaces", async () => {
    const vm = mount({ template: "<div v-translate>\tPending\t\t \t\r\n\t\f\v</div>" }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("En cours");
  });

  it("translates known strings according to a given translation context", async () => {
    let vm = mount({ template: '<div v-translate translate-context="Verb">Answer</div>' }).vm;
    (vm as any).$gettextPlugin.current = "en_US";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Answer (verb)");
    vm = mount({ template: '<div v-translate translate-context="Noun">Answer</div>' }).vm;
    expect(vm.$el.innerHTML).toEqual("Answer (noun)");
  });

  it("works with text content", () => {
    const vm = mount({ template: "<div v-translate>This is sparta!</div>" }).vm;
    expect(vm.$el.innerHTML).toEqual("This is sparta!");
  });

  it("works with HTML content", () => {
    const vm = mount({
      template: '<div v-translate>This is <strong class="txt-primary">sparta</strong>!</div>',
    }).vm;
    expect(vm.$el.innerHTML).toEqual('This is <strong class="txt-primary">sparta</strong>!');
  });

  it("allows interpolation", async () => {
    const vm = mount({
      template: "<p v-translate>Hello <strong>%{ name }</strong></p>",
      data() {
        return { name: "John Doe" };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Bonjour <strong>John Doe</strong>");
  });

  it("escapes HTML in variables by default", async () => {
    const vm = mount({
      template: "<p v-translate>Hello %{ openingTag }%{ name }%{ closingTag }</p>",
      data() {
        return {
          name: "John Doe",
          openingTag: "<b>",
          closingTag: "</b>",
        };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Bonjour &lt;b&gt;John Doe&lt;/b&gt;");
  });

  it("forces HTML rendering in variables (with the `render-html` attribute set to `true`)", async () => {
    const vm = mount({
      template: '<p v-translate render-html="true">Hello %{ openingTag }%{ name }%{ closingTag }</p>',
      data() {
        return {
          name: "John Doe",
          openingTag: "<b>",
          closingTag: "</b>",
        };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Bonjour <b>John Doe</b>");
  });

  it("allows interpolation with computed property", async () => {
    const vm = mount({
      template: "<p v-translate>Hello <strong>%{ name }</strong></p>",
      computed: {
        name() {
          return "John Doe";
        },
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Bonjour <strong>John Doe</strong>");
  });

  it("allows custom params for interpolation", async () => {
    const vm = mount({
      template: '<p v-translate="{name: someNewNameVar}">Hello <strong>%{ name }</strong></p>',
      data() {
        return {
          someNewNameVar: "John Doe",
        };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Bonjour <strong>John Doe</strong>");
  });

  it("allows interpolation within v-for with custom params", async () => {
    let names = ["John Doe", "Chester"];
    const vm = mount({
      template: '<p><span v-for="name in names" v-translate="{name: name}">Hello <strong>%{ name }</strong></span></p>',
      data() {
        return {
          names,
        };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    let html = vm.$el.innerHTML.trim();
    let missedName = names.some((name) => {
      if (html.indexOf(name) === -1) {
        return true;
      }
    });
    expect(missedName).toEqual(false);
  });

  it("logs a warning in the console if translate-params is used", async () => {
    const warnSpy = jest.spyOn(console, "warn");
    const vm = mount({
      template: '<p v-translate :translate-params="{name: someNewNameVar}">Hello <strong>%{ name }</strong></p>',
      data() {
        return {
          someNewNameVar: "John Doe",
        };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Bonjour <strong>name</strong>");
    expect(console.warn).toHaveBeenCalled;
    warnSpy.mockRestore();
  });

  it("updates a translation after a data change", async () => {
    const vm = mount({
      template: '<p v-translate="name">Hello <strong>%{ name }</strong></p>',
      data() {
        return { name: "John Doe" };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Bonjour <strong>John Doe</strong>");
    (vm as any).name = "Kenny";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Bonjour <strong>Kenny</strong>");
  });

  it("translates plurals", async () => {
    const vm = mount({
      template:
        '<p v-translate :translate-n="count" translate-plural="<strong>%{ count }</strong> cars"><strong>%{ count }</strong> car</p>',
      data() {
        return { count: 2 };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("<strong>2</strong> véhicules");
  });

  it("translates plurals with computed property", async () => {
    const vm = mount({
      template:
        '<p v-translate :translate-n="count" translate-plural="<strong>%{ count }</strong> cars"><strong>%{ count }</strong> car</p>',
      computed: {
        count() {
          return 2;
        },
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("<strong>2</strong> véhicules");
  });

  it("updates a plural translation after a data change", async () => {
    const vm = mount({
      template:
        '<p v-translate="count + brand" :translate-n="count" translate-plural="<strong>%{ count }</strong> %{ brand } cars"><strong>%{ count }</strong> %{ brand } car</p>',
      data() {
        return { count: 1, brand: "Toyota" };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("<strong>1</strong> Toyota véhicule");
    (vm as any).count = 8;
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("<strong>8</strong> Toyota véhicules");
  });

  it("updates a translation after a language change", async () => {
    const vm = mount({ template: "<div v-translate>Pending</div>" }).vm;
    (vm as any).$gettextPlugin.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("En cours");
    (vm as any).$gettextPlugin.current = "en_US";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Pending");
  });

  it("supports conditional rendering such as v-if, v-else-if, v-else", async () => {
    const vm = mount({
      template: `
      <div v-if="show" v-translate>Pending</div>
      <div v-else v-translate>Hello <strong>%{ name }</strong></div>
      `,
      data() {
        return { show: true, name: "John Doe" };
      },
    }).vm;
    (vm as any).$gettextPlugin.current = "en_US";
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Pending");
    (vm as any).show = false;
    await vm.$nextTick();
    expect(vm.$el.innerHTML).toEqual("Hello <strong>John Doe</strong>");
  });
});
