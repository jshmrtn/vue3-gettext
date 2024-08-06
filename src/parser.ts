import PO from "pofile";

type MessageCtx = {
  message: string;
  messagePlural?: string;
  context?: string;
  lineNumber: number;
};

function parseQuotedStringParams(src: string): string[] | undefined {
  const regex = new RegExp(
    /\s*(("(?<doubleQuotes>(?:[^"\\]|\\.)*)")|('(?<singleQuotes>(?:[^'\\]|\\.)*)')|(`(?<backTicks>(?:[^`\\]|\\.)*)`))(\s*,\s*(?<remainder>.*))*/,
  );
  const res = regex.exec(src);

  if (!res?.groups) {
    return undefined;
  }

  let next: string[] = [];
  if (res.groups.remainder) {
    const parsedRem = parseQuotedStringParams(res.groups.remainder);
    if (parsedRem) {
      next = parsedRem;
    }
  }

  if (res.groups.doubleQuotes) {
    return [res.groups.doubleQuotes, ...next];
  }
  if (res.groups.singleQuotes) {
    return [res.groups.singleQuotes, ...next];
  }
  if (res.groups.backTicks) {
    return [res.groups.backTicks, ...next];
  }

  return undefined;
}

export type TranslationMethodCall = {
  method: string;
  messageArgs: string[];
  lineNumber: number;
};

function escapeRegexValue(value: string) {
  return value.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

export type KeywordMapping = {
  /** @default $gettext */
  simple?: [string];
  /** @default $ngettext */
  plural?: [string];
  /** @default $npgettext */
  ctxPlural?: [string];
  /** @default $pgettext */
  ctx?: [string];
};

export function parseSrc(mapping: KeywordMapping, src: string): MessageCtx[] {
  // TODO: discardDefaults
  const methods = {
    simple: ["$gettext", ...(mapping.simple ? mapping.simple : [])],
    plural: ["$ngettext", ...(mapping.plural ? mapping.plural : [])],
    ctxPlural: ["$npgettext", ...(mapping.ctxPlural ? mapping.ctxPlural : [])],
    ctx: ["$pgettext", ...(mapping.ctx ? mapping.ctx : [])],
  };
  console.log(
    `(?<method>${Object.values(methods)
      .map((m) => m.map((v) => escapeRegexValue(v)))
      .flat()
      .join("|")})[\\n\\r\\s]*\\([\\n\\r\\s]*(?<params>(?:[^(\\\\]|\\\\.)*)[\\n\\r\\s]*\\)`,
  );

  const regex = new RegExp(
    `(?<method>\\$gettext)[\\n\\r\\s]*\\([\\n\\r\\s]*(?<params>(?:[^(\\\\]|\\\\.)*)[\\n\\r\\s]*\\)`,
    "gm",
  );

  const res: MessageCtx[] = [];
  let match;
  while ((match = regex.exec(src)) !== null) {
    const g = match.groups;
    const params = g?.params;
    if (!params) {
      // TODO
      throw new Error("Asdf");
    }
    const lineNum = src.substring(0, match.index).split("\n").length;

    const args = parseQuotedStringParams(params);

    if (!args) {
      // TODO
      throw new Error("Asdf");
    }

    if (methods.simple.includes(g.method)) {
      res.push({
        message: args[0],
        lineNumber: lineNum,
      });
      continue;
    }

    if (methods.plural.includes(g.method)) {
      res.push({
        message: args[0],
        messagePlural: args[1],
        lineNumber: lineNum,
      });
      continue;
    }
    if (methods.ctx.includes(g.method)) {
      res.push({
        context: args[0],
        message: args[1],
        lineNumber: lineNum,
      });
      continue;
    }
    if (methods.ctxPlural.includes(g.method)) {
      res.push({
        context: args[0],
        message: args[1],
        messagePlural: args[2],
        lineNumber: lineNum,
      });
      continue;
    }
  }
  return res;
}

export function makePO(fileName: string, msgs: MessageCtx[]): PO {
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
