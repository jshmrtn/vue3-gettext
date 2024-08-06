import { mountWithPlugin } from "./utils";
import translations from "./json/component";
import { nextTick } from "vue";

// TODO: rename file
const mount = mountWithPlugin({
  availableLanguages: {
    en_US: "American English",
    fr_FR: "Français",
  },
  defaultLanguage: "en_US",
  translations,
  setGlobalProperties: true,
});

describe("translate component tests", () => {
  it("works on empty strings", async () => {
    const wrapper = mount({
      template: `<div>{{ $gettext("") }}</div>`,
    });
    expect(wrapper.element.innerHTML.trim()).toBe("");
  });

  it("returns an untranslated string when no translation is available for a language", async () => {
    const warnSpy = vi.spyOn(console, "warn");
    const wrapper = mount({ template: "<div>{{ $gettext('Untranslated string') }}</div>" });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_BE";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Untranslated string");
    expect(warnSpy).toHaveBeenCalledTimes(2);
    warnSpy.mockRestore();
  });

  it("returns an untranslated string when no translation key is available", async () => {
    const warnSpy = vi.spyOn(console, "warn");
    const wrapper = mount({ template: "<div>{{ $gettext('Untranslated string') }}</div>" });
    const vm = wrapper.vm as any;
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Untranslated string");
    expect(warnSpy).toHaveBeenCalledTimes(1);
    warnSpy.mockRestore();
  });

  it("translates known strings", async () => {
    const wrapper = mount({ template: "<div>{{ $gettext('Pending') }}</div>" });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("En cours");
  });

  it("translates strings no matter the number of spaces", async () => {
    const wrapper = mount({
      template: `<div>{{ $gettext('A lot    of  lines') }}</div>`,
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual(`Plein de lignes`);
  });

  it("translates known strings according to a given translation context", async () => {
    let wrapper = mount({ template: '<div>{{ $pgettext("Verb", "Answer") }}</div>' });
    let vm = wrapper.vm as any;
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Answer (verb)");
    wrapper = mount({ template: '<div>{{ $pgettext("Noun", "Answer") }}</div>' });
    vm = wrapper.vm as any;
    vm.$language.current = "en_US";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Answer (noun)");
  });

  it("allows interpolation", async () => {
    const wrapper = mount({
      template: "<p>{{ $gettext('Hello %{ name }', { name }) }}</p>",
      data() {
        return { name: "John Doe" };
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Bonjour John Doe");
  });

  it("allows custom params for interpolation", async () => {
    const wrapper = mount({
      template: '<p>{{ $gettext("Hello %{ name }", { name: someNewNameVar }) }}</p>',
      data() {
        return {
          someNewNameVar: "John Doe",
        };
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Bonjour John Doe");
  });

  it("translates plurals", async () => {
    const wrapper = mount({
      template: `<p>
            {{ $ngettext("%{ count } car", "%{ count } cars", count, { count }) }}
          </p>`,
      data() {
        return { count: 2 };
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("2 véhicules");
  });

  it("translates plurals with computed property", async () => {
    const wrapper = mount({
      template: `<p>
            {{ $ngettext("%{ count } car", "%{ count } cars", count, { count }) }}
          </p>`,
      computed: {
        count() {
          return 2;
        },
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("2 véhicules");
  });

  it("updates a plural translation after a data change", async () => {
    const wrapper = mount({
      template: `<p>
            {{ $ngettext("%{ count } car", "%{ count } cars", count, { count }) }}
          </p>`,
      data() {
        return { count: 10 };
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("10 véhicules");
    vm.count = 8;
    await vm.$nextTick();

    expect(vm.$el.innerHTML.trim()).toEqual("8 véhicules");
  });

  it("updates a translation after a language change", async () => {
    const wrapper = mount({ template: "<div>{{ $gettext('Pending') }}</div>" });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("En cours");
    vm.$language.current = "en_US";
    await vm.$nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("Pending");
  });
});

describe("translate component tests for interpolation", () => {
  it("goes up the parent chain of a nested component to evaluate `name`", async () => {
    const wrapper = mount({
      template: `<div><inner-component>{{ $gettext("Hello %{ name }", { name: "John Doe" }) }}</inner-component></div>`,
      components: {
        "inner-component": {
          template: `<p><slot /></p>`,
        },
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("<p>Bonjour John Doe</p>");
  });

  it("goes up the parent chain of a nested component to evaluate `name`", async () => {
    const warnSpy = vi.spyOn(console, "warn");
    const wrapper = mount({
      template: `<div><inner-component>{{ $gettext("Hello %{ name }", { name: "Jane Doe" }) }}</inner-component></div>`,
      components: {
        "inner-component": {
          template: `<p><slot /></p>`,
        },
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("<p>Bonjour Jane Doe</p>");
    expect(warnSpy).not.toHaveBeenCalled;
    warnSpy.mockRestore();
  });

  it("goes up the parent chain of 2 nested components to evaluate `name`", async () => {
    const warnSpy = vi.spyOn(console, "warn");
    const wrapper = mount({
      template: `<div><first-component>{{ $gettext("Hello %{ name }", { name: "Jane Doe" }) }}</first-component></div>`,
      components: {
        "first-component": {
          template: `<p><second-component><slot /></second-component></p>`,
          components: {
            "second-component": {
              template: `<b><slot /></b>`,
            },
          },
        },
      },
    });
    const vm = wrapper.vm as any;
    vm.$language.current = "fr_FR";
    await nextTick();
    expect(vm.$el.innerHTML.trim()).toEqual("<p><b>Bonjour Jane Doe</b></p>");
    expect(console.warn).not.toHaveBeenCalled;
    warnSpy.mockRestore();
  });
});
