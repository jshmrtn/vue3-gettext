import { makePO, parseSrc } from "../src/parser";
import unicodeTestPage from "./json/unicodeTestPage.txt?raw";

describe("parser", () => {
  it("basic function calls", () => {
    const src = `
<template>
  <div>
    <p>
      <button @click="toggleShow()">Toggle: {{ show }}</button>
      <span v-if="show" class="translated">{{ $gettext(         "Welcome, %{ name }", { name: obj.name }) }}</span>
    </p>
    <div>
      <p>
        <button @click="setName1()">{{ $gettext("asdf") }}</button>
        <button @click="setName2()">2</button>
        <button @click="setName3()">3</button>
        [{{ obj.name }}]
      </p>
      <p v-if="obj.name === 'Group1'" v-translate="{ obj }" class="translated">This is %{ obj.name }</p>
      <p v-else-if="obj.name === 'Group2'" v-translate="{ obj }" class="translated">This is %{ obj.name }</p>
      <p v-else v-translate="{ obj }" class="translated">This is %{ obj.name }</p>
    </div>
    {{ $ngettext("%{count} book", "%{count} books", n, { n }) }}
  </div>
</template>
    `;

    expect(parseSrc(src)).toStrictEqual([
      {
        message: "Welcome, %{ name }",
        lineNumber: 6,
      },
      {
        message: "asdf",
        lineNumber: 10,
      },
      {
        lineNumber: 19,
        message: "%{count} book",
        messagePlural: "%{count} books",
      },
    ]);

    const po = makePO("testFile", parseSrc(src));
    expect(po.toString()).toBe(`msgid \"\"
msgstr \"\"

#: testFile:6
msgid \"Welcome, %{ name }\"
msgstr \"Welcome, %{ name }\"

#: testFile:10
msgid \"asdf\"
msgstr \"asdf\"

#: testFile:19
msgid \"%{count} book\"
msgid_plural \"%{count} books\"
msgstr[0] \"%{count} book\"
msgstr[1] \"%{count} books\"
`);
  });

  it("handles line breaks correctly", () => {
    expect(
      parseSrc(`$gettext(\`Test
With
Line breaks\`)`),
    ).toStrictEqual([
      {
        lineNumber: 1,
        message: `Test
With
Line breaks`,
      },
    ]);
  });

  it("deals with all sorts of symbols", () => {
    // make sure the data is loaded correctly
    expect(unicodeTestPage.startsWith("#$%&'()*+,")).toBe(true);
    expect(parseSrc(`$gettext(\`${unicodeTestPage}\`)`)).toStrictEqual([
      {
        message: unicodeTestPage,
        lineNumber: 1,
      },
    ]);
  });

  it("deals with escaped quotes", () => {
    expect(parseSrc(String.raw`$gettext("t'\`e\"st")`)).toStrictEqual([
      {
        message: String.raw`t'\`e\"st`,
        lineNumber: 1,
      },
    ]);

    expect(parseSrc(String.raw`$gettext('t\'\`e"st')`)).toStrictEqual([
      {
        message: String.raw`t\'\`e"st`,
        lineNumber: 1,
      },
    ]);

    expect(parseSrc("$gettext(`t'\\`est`)")).toStrictEqual([
      {
        message: "t'\\`est",
        lineNumber: 1,
      },
    ]);

    expect(parseSrc(String.raw`$ngettext("t'\`e\"st", 't\'\`e"st')`)).toStrictEqual([
      {
        // prettier-ignore
        message: "t'\\\`e\\\"st",
        // prettier-ignore
        messagePlural: "t\\'\\\`e\"st",
        lineNumber: 1,
      },
    ]);
  });

  it("deals with escaped quotes", () => {
    expect(parseSrc(`$ngettext("te(st)(()", "test)(()")`)).toStrictEqual([
      {
        message: `te(st)(()`,
        messagePlural: "test)(()",
        lineNumber: 1,
      },
    ]);
  });
});
