import { makePO, MsgInfo, parseSrc } from "../src/extract/parser";
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

    expect(parseSrc(src)).toEqual([
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
msgstr \"\"

#: testFile:10
msgid \"asdf\"
msgstr \"\"

#: testFile:19
msgid \"%{count} book\"
msgid_plural \"%{count} books\"
msgstr[0] \"\"
msgstr[1] \"\"
`);
  });

  it("handles line breaks correctly", () => {
    expect(
      parseSrc(`$gettext(\`Test
With
Line breaks\`)`),
    ).toEqual([
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
    expect(parseSrc(`$gettext(\`${unicodeTestPage.replace("\\", "\\\\")}\`)`)).toEqual([
      {
        message: unicodeTestPage,
        lineNumber: 1,
      },
    ]);
  });

  it("deals with escaped quotes", () => {
    expect(parseSrc(`$gettext("t'\`e\\"st")`)).toEqual([
      {
        message: `t'\`e"st`,
        lineNumber: 1,
      },
    ]);

    expect(parseSrc(`$gettext('t\\'\`e"st')`)).toEqual([
      {
        message: `t\'\`e"st`,
        lineNumber: 1,
      },
    ]);

    expect(parseSrc("$gettext(`t'\\`est`)")).toEqual([
      {
        message: "t'`est",
        lineNumber: 1,
      },
    ]);

    expect(parseSrc(`$ngettext("t'\`e\\"st", 't\\'\`e"st')`)).toEqual([
      {
        message: "t'`e\"st",
        messagePlural: `t'\`e"st`,
        lineNumber: 1,
      },
    ]);
  });

  it("deals with backslashes", () => {
    expect(parseSrc(`$gettext("\\\\"`)).toEqual([
      {
        message: `\\`,
        lineNumber: 1,
      },
    ]);
  });

  it("deals with escaped quotes", () => {
    expect(parseSrc(`$ngettext("te(st)(()", "test)(()")`)).toEqual([
      {
        message: `te(st)(()`,
        messagePlural: "test)(()",
        lineNumber: 1,
      },
    ]);
  });

  it("deals with repeated keywords", () => {
    expect(parseSrc(`$gettext $gettext("test")`)).toEqual(<MsgInfo[]>[
      {
        message: `test`,
        lineNumber: 1,
      },
    ]);
  });

  it("parse vue file", () => {
    const src = `
<script>
export default {
  name: 'Test',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
<template>
  <div>
    {{ $gettext("%{fullName} wants to say hello", {fullName: user.fullName}) }}
  </div>
</template>
`;
    expect(parseSrc(src)).toEqual(<MsgInfo[]>[
      {
        message: `%{fullName} wants to say hello`,
        lineNumber: 15,
      },
    ]);
  });

  it("leave variable as not translatable", () => {
    const src = `
<script>
export default {
  name: 'Test',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
<template>
  <h1>{{ $gettext(title) }}</h1>
  <div>
    {{ $gettext("Hello there") }}
  </div>
</template>
`
    expect(parseSrc(src)).toEqual(<MsgInfo[]>[
      {
        message: `Hello there`,
        lineNumber: 16,
      },
    ]);
  });

  // TODO: test using fixtures
  // TODO: test all function calls
  // TODO: test custom function keywords
  // TODO: test nested calls
  // TODO: more PO file tests
  // TODO: test normalized line breaks
});
