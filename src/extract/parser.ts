import PO from "pofile";
import { Token, tokenize, TokenKind } from "./tokenizer";
import { KeywordMapping } from "../typeDefs";
import { assertIsDefined } from "../utilities";

type BaseMsg = { message: string; messagePlural?: string; context?: string };

export type MsgInfo = BaseMsg & {
  lineNumber: number;
};

type MsgInfoWithCharIdx = BaseMsg & { idx: number };

export function parseFunctionCall(mapping: KeywordMapping, tokens: Token[]): MsgInfoWithCharIdx[] {
  let idx = -1;
  let t: Token | undefined = undefined;

  function advance() {
    idx += 1;
    return tokens[idx];
  }

  const msgs: MsgInfoWithCharIdx[] = [];

  while (true) {
    t = advance();
    if (!t) {
      break;
    }

    if (t.kind !== TokenKind.Keyword) {
      continue;
    }
    assertIsDefined(t.value);
    const keyword = t.value;
    const charIndex = t.idx;
    t = advance();
    if (t.kind !== TokenKind.ParenLeft) {
      // not a function call
      continue;
    }
    t = advance();
    const stringArgs: string[] = [];

    // parse strings arguments
    while (true) {
      if (t.kind !== TokenKind.String) {
        break;
      }
      assertIsDefined(t.value);
      stringArgs.push(t.value);
      t = advance();
      if (!t) {
        break;
      }
      if (t.kind !== TokenKind.Comma) {
        break;
      }
      t = advance();
    }

    msgs.push(getMsgInfo(mapping, keyword, charIndex, stringArgs));
  }

  return msgs;
}

function getMsgInfo(
  mapping: KeywordMapping,
  keyword: string,
  charIdx: number,
  stringArgs: string[],
): MsgInfoWithCharIdx {
  if (mapping.simple?.includes(keyword)) {
    return {
      message: stringArgs[0],
      idx: charIdx,
    };
  }

  if (mapping.plural?.includes(keyword)) {
    return {
      message: stringArgs[0],
      messagePlural: stringArgs[1],
      idx: charIdx,
    };
  }
  if (mapping.ctx?.includes(keyword)) {
    return {
      context: stringArgs[0],
      message: stringArgs[1],
      idx: charIdx,
    };
  }
  if (mapping.ctxPlural?.includes(keyword)) {
    return {
      context: stringArgs[0],
      message: stringArgs[1],
      messagePlural: stringArgs[2],
      idx: charIdx,
    };
  }

  throw new Error(`no mapping found for keyword "${keyword}", please report this error`);
}

export function getKeywords(keywords?: KeywordMapping, overrideDefaults = false): KeywordMapping {
  if (overrideDefaults) {
    if (!keywords) {
      throw new Error(`overrideDefaults is enabled but no keywords provided in config`);
    }
    return keywords;
  }
  // merge with defaults
  return {
    simple: ["$gettext", ...(keywords?.simple ? keywords?.simple : [])],
    plural: ["$ngettext", ...(keywords?.plural ? keywords?.plural : [])],
    ctxPlural: ["$npgettext", ...(keywords?.ctxPlural ? keywords?.ctxPlural : [])],
    ctx: ["$pgettext", ...(keywords?.ctx ? keywords?.ctx : [])],
  };
}

/** Careful: API is not stable */
export function parseSrc(src: string, options?: { mapping?: KeywordMapping; overrideDefaults?: boolean }): MsgInfo[] {
  const keywords = getKeywords(options?.mapping, options?.overrideDefaults);

  const tokens = tokenize(keywords, src);
  const msgs = parseFunctionCall(keywords, tokens);
  return msgs.map((info): MsgInfo => {
    const i: Omit<MsgInfoWithCharIdx, "idx"> = { ...info };
    // @ts-expect-error
    delete i.idx;
    return {
      ...i,
      lineNumber: src.substring(0, info.idx).split("\n").length,
    };
  });
}

/** Careful: API is not stable */
export function makePO(fileName: string, msgs: MsgInfo[]): PO {
  const po = new PO();

  for (const msg of msgs) {
    const item = new PO.Item();
    item.msgid = msg.message;
    item.msgid_plural = msg.messagePlural;
    item.msgctxt = msg.context;
    item.msgstr = [msg.message, ...(msg.messagePlural ? [msg.messagePlural] : [])];
    item.references = [`${fileName}:${msg.lineNumber}`];
    po.items.push(item);
  }

  return po;
}
