import { getKeywords } from "../src/extract/parser";
import { Token, tokenize, TokenKind } from "../src/extract/tokenizer";

const keywords = getKeywords();

describe("tokenizer", () => {
  it("basic function calls", () => {
    expect(tokenize(keywords, `("test")`)).toEqual(<Token[]>[
      { kind: TokenKind.ParenLeft, idx: 0 },
      { kind: TokenKind.String, value: "test", idx: 1 },
    ]);

    expect(tokenize(keywords, `("test", 'test', \`test\`)`)).toEqual(<Token[]>[
      { kind: TokenKind.ParenLeft, idx: 0 },
      { kind: TokenKind.String, value: "test", idx: 1 },
      { kind: TokenKind.Comma, idx: 7 },
      { kind: TokenKind.String, value: "test", idx: 9 },
      { kind: TokenKind.Comma, idx: 15 },
      { kind: TokenKind.String, value: "test", idx: 17 },
    ]);
  });

  it("deals with escaped delimiters", () => {
    expect(tokenize(keywords, `("te\\"s\\\\t", 'te\\'st', \`te\\\`st\`)`)).toEqual(<Token[]>[
      { kind: TokenKind.ParenLeft, idx: 0 },
      { kind: TokenKind.String, value: `te"s\\t`, idx: 1 },
      { kind: TokenKind.Comma, idx: 11 },
      { kind: TokenKind.String, value: `te'st`, idx: 13 },
      { kind: TokenKind.Comma, idx: 21 },
      { kind: TokenKind.String, value: "te`st", idx: 23 },
    ]);
  });

  // TODO: more complex tests
});
