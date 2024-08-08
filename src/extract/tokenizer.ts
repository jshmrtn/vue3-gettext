import { KeywordMapping } from "../typeDefs";

export enum TokenKind {
  ParenLeft = "ParenLeft",
  Comma = "Comma",
  QuotDouble = "QuotDouble",
  QuotSingle = "QuotSingle",
  BackTick = "BackTick",
  String = "String",
  Keyword = "Keyword",
  Unrecognized = "Unrecognized",
}

export type Token = {
  kind: TokenKind;
  idx: number;
  value?: string;
};

/** Careful: API is not stable */
export function tokenize(mapping: KeywordMapping, src: string): Token[] {
  const tokens: Token[] = [];
  let idx = -1;
  let unrecognizedContent = "";

  const keywords = Object.values(mapping).flat();
  const maxKeywordLen = keywords.reduce((prev, curr) => {
    if (curr.length > prev) {
      return curr.length;
    }
    return prev;
  }, 0);

  function advance() {
    idx += 1;
    return src.charAt(idx);
  }

  function addToken(kind: TokenKind, charIndex: number, value?: string) {
    if (unrecognizedContent.trim()) {
      tokens.push({ kind: TokenKind.Unrecognized, idx });
      unrecognizedContent = "";
    }
    if (value) {
      tokens.push({ kind, idx: charIndex, value });
      return;
    }
    tokens.push({ kind, idx: charIndex });
  }

  function readString(delimiter: string) {
    let content = "";
    let prevChar = delimiter;
    let c = advance();
    function advanceChar() {
      prevChar = c;
      c = advance();
    }

    while (true) {
      if (c === "") {
        console.error(`parsing error, string literal is not closed until end of file`);
        break;
      }
      if (prevChar !== "\\") {
        if (c === "\\") {
          advanceChar();
          continue;
        }
        if (c === delimiter) {
          break;
        }
      }

      const backSlashInserted = c === "\\";

      content += c;
      advanceChar();
      if (backSlashInserted) {
        prevChar = "\\\\";
      }
    }
    return content.replace(/\r\n/g, "\n");
  }

  function scanToken() {
    const c = advance();
    switch (c) {
      case "(":
        addToken(TokenKind.ParenLeft, idx);
        break;
      case ",":
        addToken(TokenKind.Comma, idx);
        break;
      case '"':
      case "'":
      case "`":
        // this check prevents parsing string literals that aren't part of a function call
        // improves robustness as it prevents issues with odd numbers
        // but will also parse calls within string literals
        const prevTokenKind = tokens[tokens.length - 1]?.kind;
        if (prevTokenKind === TokenKind.ParenLeft || prevTokenKind === TokenKind.Comma) {
          addToken(TokenKind.String, idx, readString(c));
          break;
        }
      default:
        if (c.match(/\s\n\r/)) {
          break;
        }
        // TODO: too expensive to run on every char?
        const possibleKeyword = src.substring(idx, idx + maxKeywordLen);
        const matchedKeyword = keywords
          .filter((kw) => possibleKeyword.startsWith(kw))
          .reduce(
            (prev, curr) => {
              if (curr.length > (prev?.length ?? 0)) {
                return curr;
              }
              return prev;
            },
            <string | undefined>undefined,
          );
        if (matchedKeyword) {
          addToken(TokenKind.Keyword, idx, matchedKeyword);
          idx += matchedKeyword.length - 1;
          break;
        }

        // unrecognized character, continue
        unrecognizedContent += c;
        break;
    }
  }

  while (idx < src.length) {
    scanToken();
  }

  return tokens;
}
