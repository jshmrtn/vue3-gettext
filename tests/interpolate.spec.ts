import rawInterpolate from "../src/interpolate";
import translations from "./json/translate";
import { mountWithPlugin } from "./utils";
import type { Language } from "../src/typeDefs";

const mount = mountWithPlugin({
  translations: translations,
  silent: true,
  setGlobalProperties: true,
});

const wrapper = mount({ template: "<div></div>" });
const plugin = wrapper.vm.$.appContext.config.globalProperties.$language as Language;

const interpolate = rawInterpolate(plugin);

describe("Interpolate tests", () => {
  it("without placeholders", () => {
    const msgid = "Foo bar baz";
    const interpolated = interpolate(msgid);
    expect(interpolated).toEqual("Foo bar baz");
  });

  it("with a placeholder", () => {
    const msgid = "Foo %{ placeholder } baz";
    const context = { placeholder: "bar" };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Foo bar baz");
  });

  it("with HTML in var", () => {
    const msgid = "Foo %{ placeholder } baz";
    const context = { placeholder: "<p>bar</p>" };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Foo <p>bar</p> baz");
  });

  it("with multiple spaces in the placeholder", () => {
    const msgid = "Foo %{              placeholder                              } baz";
    const context = { placeholder: "bar" };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Foo bar baz");
  });

  it("with the same placeholder multiple times", () => {
    const msgid = "Foo %{ placeholder } baz %{ placeholder } foo";
    const context = { placeholder: "bar" };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Foo bar baz bar foo");
  });

  it("with multiple placeholders", () => {
    const msgid = "%{foo}%{bar}%{baz}%{bar}%{foo}";
    const context = { foo: 1, bar: 2, baz: 3 };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("12321");
  });

  it("with new lines", () => {
    const msgid = "%{       \n    \n\n\n\n  foo} %{bar}!";
    const context = { foo: "Hello", bar: "world" };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Hello world!");
  });

  it("with an object", () => {
    const msgid = "Foo %{ foo.bar } baz";
    const context = {
      foo: {
        bar: "baz",
      },
    };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Foo baz baz");
  });

  it("with an array", () => {
    const msgid = "Foo %{ foo[1] } baz";
    const context = {
      foo: ["bar", "baz"],
    };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Foo baz baz");
  });

  it("with a multi level object", () => {
    const msgid = "Foo %{ a.b.x } %{ a.c.y[1].title }";
    const context = {
      a: {
        b: {
          x: "foo",
        },
        c: {
          y: [{ title: "bar" }, { title: "baz" }],
        },
      },
    };
    const interpolated = interpolate(msgid, context);
    expect(interpolated).toEqual("Foo foo baz");
  });

  it("with a failing expression", () => {
    const msgid = 'Foo %{ alert("foobar") } baz';
    const context = {
      foo: "bar",
    };
    const warnSpy = vi.spyOn(console, "warn");
    interpolate(msgid, context);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Cannot evaluate expression: alert("foobar")');
    warnSpy.mockRestore();
  });

  it("should warn of the usage of mustache syntax", () => {
    const msgid = "Foo {{ foo }} baz";
    const context = {
      foo: "bar",
    };
    const warnSpy = vi.spyOn(console, "warn");
    interpolate(msgid, context);
    expect(warnSpy).not.toHaveBeenCalled;
    plugin.silent = false;
    interpolate(msgid, context);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    warnSpy.mockRestore();
  });
});
