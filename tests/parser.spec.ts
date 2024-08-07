import { makePO, parseSrc } from "../src/parser";

describe("parser", () => {
  it("works on empty strings", async () => {
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
});
