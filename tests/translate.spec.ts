import type { Language } from "../src/typeDefs";
import translateRaw from "../src/translate";
import { mountWithPlugin } from "./utils";
import translations from "./json/translate";

const mount = mountWithPlugin({
  availableLanguages: {
    en_US: "American English",
    fr_FR: "Français",
  },
  defaultLanguage: "en_US",
  sourceCodeLanguage: "en_US",
  translations: translations,
  setGlobalProperties: true,
});

const wrapper = mount({ template: "<div></div>" });
let plugin = wrapper.vm.$.appContext.config.globalProperties.$language as Language;
const setLanguage = (lang: string) => (plugin.current = lang);

const translate = translateRaw(plugin);

describe("Translate tests", () => {
  let translated;
  beforeEach(async () => {
    plugin = wrapper.vm.$.appContext.config.globalProperties.$language as Language;
    setLanguage("en_US");
  });

  it("tests the getTranslation() method", () => {
    translated = translate.getTranslation("", 1, null, null, "fr_FR");
    expect(translated).toEqual("");

    translated = translate.getTranslation("Unexisting language", null, null, null, "be_FR");
    expect(translated).toEqual("Unexisting language");

    translated = translate.getTranslation("Untranslated key", null, null, null, "fr_FR");
    expect(translated).toEqual("Untranslated key");

    translated = translate.getTranslation("Pending", 1, null, null, "fr_FR");
    expect(translated).toEqual("En cours");

    translated = translate.getTranslation("%{ carCount } car", 2, null, null, "fr_FR");
    expect(translated).toEqual("%{ carCount } véhicules");

    translated = translate.getTranslation("Answer", 1, "Verb", null, "fr_FR");
    expect(translated).toEqual("Réponse (verbe)");

    translated = translate.getTranslation("Answer", 1, "Noun", null, "fr_FR");
    expect(translated).toEqual("Réponse (nom)");

    translated = translate.getTranslation("Pending", 1, null, null, "en_US");
    expect(translated).toEqual("Pending");

    // If no translation exists, display the untranslated message (if n==1 then use singular form).
    translated = translate.getTranslation("Untranslated %{ n } item", 1, null, "Untranslated %{ n } items", "fr_FR");
    expect(translated).toEqual("Untranslated %{ n } item");

    // If no translation exists, display the untranslated message (if n!=1 then use plural form).
    translated = translate.getTranslation("Untranslated %{ n } item", 0, null, "Untranslated %{ n } items", "fr_FR");
    expect(translated).toEqual("Untranslated %{ n } items");

    // If no translation exists, display the untranslated message (if n!=1 then use plural form).
    translated = translate.getTranslation("Untranslated %{ n } item", 10, null, "Untranslated %{ n } items", "fr_FR");
    expect(translated).toEqual("Untranslated %{ n } items");

    // Test that it works when a msgid exists with and without a context, see #32.
    translated = translate.getTranslation("Object", null, null, null, "fr_FR");
    expect(translated).toEqual("Objet");
    translated = translate.getTranslation("Object", null, "Context", null, "fr_FR");
    expect(translated).toEqual("Objet avec contexte");

    // Ensure that pluralization is right in English when there are no English translations.
    translated = translate.getTranslation("Untranslated %{ n } item", 0, null, "Untranslated %{ n } items", "en_US");
    expect(translated).toEqual("Untranslated %{ n } items");
    translated = translate.getTranslation("Untranslated %{ n } item", 1, null, "Untranslated %{ n } items", "en_US");
    expect(translated).toEqual("Untranslated %{ n } item");
    translated = translate.getTranslation("Untranslated %{ n } item", 2, null, "Untranslated %{ n } items", "en_US");
    expect(translated).toEqual("Untranslated %{ n } items");

    // Ensure that pluralization does not fail if the translation have empty strings for singural or plural form.
    translated = translate.getTranslation("%{ orangeCount } orange", 1, null, "%{ orangeCount } oranges", "en_US");
    expect(translated).toEqual("%{ orangeCount } orange");
    translated = translate.getTranslation("%{ orangeCount } orange", 2, null, "%{ orangeCount } oranges", "en_US");
    expect(translated).toEqual("%{ orangeCount } oranges");

    translated = translate.getTranslation("%{ appleCount } apple", 1, null, "%{ appleCount } apples", "en_US");
    expect(translated).toEqual("1 apple");
    translated = translate.getTranslation("%{ appleCount } apple", 2, null, "%{ appleCount } apples", "en_US");
    expect(translated).toEqual("%{ appleCount } apples");

    // Test plural message with multiple contexts (default context and 'Context'')
    translated = translate.getTranslation("%{ carCount } car (multiple contexts)", 1, null, null, "en_US");
    expect(translated).toEqual("1 car");
    translated = translate.getTranslation("%{ carCount } car (multiple contexts)", 2, null, null, "en_US");
    expect(translated).toEqual("%{ carCount } cars");
    translated = translate.getTranslation("%{ carCount } car (multiple contexts)", 1, "Context", null, "en_US");
    expect(translated).toEqual("1 car with context");
    translated = translate.getTranslation("%{ carCount } car (multiple contexts)", 2, "Context", null, "en_US");
    expect(translated).toEqual("%{ carCount } cars with context");
  });

  it("tests the gettext() method", () => {
    const gettext = translate.gettext.bind(translate) as Language["$gettext"];

    setLanguage("fr_FR");
    expect(gettext("Pending")).toEqual("En cours");

    setLanguage("en_US");
    expect(gettext("Pending")).toEqual("Pending");

    expect(gettext("Interpolated: %{param1}", { param1: "success" })).toEqual("Interpolated: success");
    expect(gettext("Interpolated escaped: %{param1}", { param1: "<b>success</b>" })).toEqual(
      "Interpolated escaped: &lt;b&gt;success&lt;/b&gt;",
    );
    expect(gettext("Interpolated unescaped: %{param1}", { param1: "<b>success</b>" }, true)).toEqual(
      "Interpolated unescaped: <b>success</b>",
    );
  });

  it("tests the pgettext() method", () => {
    const undetectablePgettext = translate.pgettext.bind(translate) as Language["$pgettext"]; // Hide from gettext-extract.

    setLanguage("fr_FR");
    expect(undetectablePgettext("Noun", "Answer")).toEqual("Réponse (nom)");

    setLanguage("en_US");
    expect(undetectablePgettext("Noun", "Answer")).toEqual("Answer (noun)");

    expect(undetectablePgettext("ctx", "Interpolated: %{param1}", { param1: "success" })).toEqual(
      "Interpolated: success",
    );
    expect(undetectablePgettext("ctx", "Interpolated escaped: %{param1}", { param1: "<b>success</b>" })).toEqual(
      "Interpolated escaped: &lt;b&gt;success&lt;/b&gt;",
    );
    expect(
      undetectablePgettext("ctx", "Interpolated unescaped: %{param1}", { param1: "<b>success</b>" }, true),
    ).toEqual("Interpolated unescaped: <b>success</b>");
  });

  it("tests the ngettext() method", () => {
    const undetectableNgettext = translate.ngettext.bind(translate) as Language["$ngettext"]; // Hide from gettext-extract.

    setLanguage("fr_FR");
    expect(undetectableNgettext("%{ carCount } car", "%{ carCount } cars", 2)).toEqual("%{ carCount } véhicules");

    setLanguage("en_US");
    expect(undetectableNgettext("%{ carCount } car", "%{ carCount } cars", 2)).toEqual("%{ carCount } cars");

    // If no translation exists, display the untranslated message (if n==1 then use singular form).
    setLanguage("fr_FR");
    expect(undetectableNgettext("Untranslated %{ n } item", "Untranslated %{ n } items", 1)).toEqual(
      "Untranslated %{ n } item",
    );

    // If no translation exists, display the untranslated message (if n!=1 then use plural form).
    setLanguage("fr_FR");
    expect(undetectableNgettext("Untranslated %{ n } item", "Untranslated %{ n } items", -1)).toEqual(
      "Untranslated %{ n } items",
    );

    expect(
      undetectableNgettext("Interpolated: %{param1}", "Interpolated plural: %{param1}", 1, { param1: "success" }),
    ).toEqual("Interpolated: success");
    expect(
      undetectableNgettext("Interpolated escaped: %{param1}", "Interpolated escaped plural: %{param1}", 1, {
        param1: "<b>success</b>",
      }),
    ).toEqual("Interpolated escaped: &lt;b&gt;success&lt;/b&gt;");
    expect(
      undetectableNgettext(
        "Interpolated unescaped: %{param1}",
        "Interpolated unescaped plural: %{param1}",
        1,
        { param1: "<b>success</b>" },
        true,
      ),
    ).toEqual("Interpolated unescaped: <b>success</b>");
  });

  it("tests the npgettext() method", () => {
    const undetectableNpgettext = translate.npgettext.bind(translate) as Language["$npgettext"]; // Hide from gettext-extract

    setLanguage("fr_FR");
    expect(undetectableNpgettext("Noun", "%{ carCount } car (noun)", "%{ carCount } cars (noun)", 2)).toEqual(
      "%{ carCount } véhicules (nom)",
    );

    setLanguage("en_US");
    expect(undetectableNpgettext("Verb", "%{ carCount } car (verb)", "%{ carCount } cars (verb)", 2)).toEqual(
      "%{ carCount } cars (verb)",
    );

    setLanguage("fr_FR");
    expect(undetectableNpgettext("Noun", "%{ carCount } car (noun)", "%{ carCount } cars (noun)", 1)).toEqual(
      "%{ carCount } véhicule (nom)",
    );

    setLanguage("en_US");
    expect(undetectableNpgettext("Verb", "%{ carCount } car (verb)", "%{ carCount } cars (verb)", 1)).toEqual(
      "%{ carCount } car (verb)",
    );

    // If no translation exists, display the default singular form (if n < 2).
    setLanguage("fr_FR");
    expect(
      undetectableNpgettext("Noun", "Untranslated %{ n } item (noun)", "Untranslated %{ n } items (noun)", 1),
    ).toEqual("Untranslated %{ n } item (noun)");

    // If no translation exists, display the default plural form (if n > 1).
    setLanguage("fr_FR");
    expect(
      undetectableNpgettext("Noun", "Untranslated %{ n } item (noun)", "Untranslated %{ n } items (noun)", 2),
    ).toEqual("Untranslated %{ n } items (noun)");

    expect(
      undetectableNpgettext("ctx", "Interpolated: %{param1}", "Interpolated plural: %{param1}", 1, {
        param1: "success",
      }),
    ).toEqual("Interpolated: success");
    expect(
      undetectableNpgettext("ctx", "Interpolated escaped: %{param1}", "Interpolated escaped plural: %{param1}", 1, {
        param1: "<b>success</b>",
      }),
    ).toEqual("Interpolated escaped: &lt;b&gt;success&lt;/b&gt;");
    expect(
      undetectableNpgettext(
        "ctx",
        "Interpolated unescaped: %{param1}",
        "Interpolated unescaped plural: %{param1}",
        1,
        { param1: "<b>success</b>" },
        true,
      ),
    ).toEqual("Interpolated unescaped: <b>success</b>");
  });

  it("works when a msgid exists with and without a context, but the one with the context has not been translated", () => {
    expect(plugin.silent).toEqual(false);
    const warnSpy = vi.spyOn(console, "warn");

    translated = translate.getTranslation("May", null, null, null, "fr_FR");
    expect(translated).toEqual("Pourrait");

    translated = translate.getTranslation("May", null, "Month name", null, "fr_FR");
    expect(translated).toEqual("May");

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith("Untranslated fr_FR key found: May (with context: Month name)");

    warnSpy.mockRestore();
  });
});
