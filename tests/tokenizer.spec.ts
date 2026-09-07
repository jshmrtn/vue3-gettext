import { getKeywords } from "../src/extract/parser";
import { Token, tokenize, TokenKind } from "../src/extract/tokenizer";

const keywords = getKeywords();

describe("tokenizer", () => {
  it("basic function calls", () => {
    expect(tokenize(keywords, `$gettext("test")`)).toEqual(<Token[]>[
      { kind: TokenKind.Keyword, idx: 0, value: "$gettext" },
      { kind: TokenKind.ParenLeft, idx: 8 },
      { kind: TokenKind.String, value: "test", idx: 9 },
    ]);

    expect(tokenize(keywords, `$npgettext("test", 'test', \`test\`)`)).toEqual(<Token[]>[
      { kind: TokenKind.Keyword, idx: 0, value: "$npgettext" },
      { kind: TokenKind.ParenLeft, idx: 10 },
      { kind: TokenKind.String, value: "test", idx: 11 },
      { kind: TokenKind.Comma, idx: 17 },
      { kind: TokenKind.String, value: "test", idx: 19 },
      { kind: TokenKind.Comma, idx: 25 },
      { kind: TokenKind.String, value: "test", idx: 27 },
    ]);
  });

  it("deals with escaped delimiters", () => {
    expect(tokenize(keywords, `$npgettext("te\\"s\\\\t", 'te\\'st', \`te\\\`st\`)`)).toEqual(<Token[]>[
      { kind: TokenKind.Keyword, idx: 0, value: "$npgettext" },
      { kind: TokenKind.ParenLeft, idx: 10 },
      { kind: TokenKind.String, value: `te"s\\t`, idx: 11 },
      { kind: TokenKind.Comma, idx: 21 },
      { kind: TokenKind.String, value: `te'st`, idx: 23 },
      { kind: TokenKind.Comma, idx: 31 },
      { kind: TokenKind.String, value: "te`st", idx: 33 },
    ]);
  });

  it("does not read Vue template text as a string literal", () => {
    const src = `<template>
  <p>('</p>
  <p>{{ $gettext(\`Hello\`) }}</p>
</template>`;

    expect(tokenize(keywords, src)).toContainEqual(
      expect.objectContaining({
        kind: TokenKind.String,
        value: "Hello",
      }),
    );
  });

  it("read vue file", () => {
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
    expect(tokenize(keywords, src)).toEqual(<Token[]>[
      {
        kind: TokenKind.Unrecognized,
        idx: 41,
        value: `\n<script>\nexport default {\n  name: 'Test'`,
      },
      { kind: TokenKind.Comma, idx: 41 },
      {
        kind: TokenKind.Unrecognized,
        idx: 84,
        value: `\n  props: {\n    user: {\n      type: Object`,
      },
      { kind: TokenKind.Comma, idx: 84 },
      {
        kind: TokenKind.Unrecognized,
        idx: 106,
        value: `\n      required: true`,
      },
      { kind: TokenKind.Comma, idx: 106 },
      { kind: TokenKind.Unrecognized, idx: 113, value: `\n    }` },
      { kind: TokenKind.Comma, idx: 113 },
      { kind: TokenKind.Unrecognized, idx: 118, value: `\n  }` },
      { kind: TokenKind.Comma, idx: 118 },
      {
        kind: TokenKind.Unrecognized,
        idx: 158,
        value: `\n}\n</script>\n<template>\n  <div>\n    {{ `,
      },
      { kind: TokenKind.Keyword, idx: 158, value: "$gettext" },
      { kind: TokenKind.ParenLeft, idx: 166 },
      {
        kind: TokenKind.String,
        idx: 167,
        value: "%{fullName} wants to say hello",
      },
      { kind: TokenKind.Comma, idx: 199 },
    ]);
  });

  // TODO: more complex tests
});
