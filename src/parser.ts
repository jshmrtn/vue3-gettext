import PO from "pofile";

type MessageCtx = {
  message: string;
  messagePlural?: string;
  context?: string;
  lineNumber: number;
};

export function parseQuotedStringParams(src: string): string[] | undefined {
  const quoteDouble = quote(`"`, "doubleQuotes");
  const quoteSingle = quote(`'`, "singleQuotes");
  const quoteBackTick = quote("`", "backTicks");

  const regex = new RegExp(`((${quoteDouble})|(${quoteSingle})|(${quoteBackTick}))${ws},?${ws}(?<remainder>.*)`);
  let res: RegExpExecArray | null = null;
  let hasMatched = false;

  let remainder = src;
  const messages: string[] = [];

  while (remainder || !hasMatched) {
    hasMatched = true;

    res = regex.exec(remainder);
    if (!res?.groups) {
      break;
    }
    remainder = res?.groups.remainder;

    if (res.groups.doubleQuotes) {
      messages.push(res.groups.doubleQuotes);
    }
    if (res.groups.singleQuotes) {
      messages.push(res.groups.singleQuotes);
    }
    if (res.groups.backTicks) {
      messages.push(res.groups.backTicks);
    }
  }
  return messages;
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
  simple?: string[];
  /** @default $ngettext */
  plural?: string[];
  /** @default $npgettext */
  ctxPlural?: string[];
  /** @default $pgettext */
  ctx?: string[];
};

const ws = `[\\n\\r\\s]*`;
function quote(delimiter: string, group?: string): string {
  const groupHead = group ? `?<${group}>` : "";
  return `${delimiter}(${groupHead}(?:[^${delimiter}\\\\]|\\\\.)*)${delimiter}`;
}
const quoteDouble = quote(`"`);
const quoteSingle = quote(`'`);
const quoteBackTick = quote("`");
const quot = `(${quoteDouble})|(${quoteSingle})|(${quoteBackTick})`;
const params = `(?<params>(${quot})(${ws},${ws}(${quot}))*)`;

export function parseSrc(src: string, mapping?: KeywordMapping): MessageCtx[] {
  // TODO: discardDefaults
  const methods = {
    simple: ["$gettext", ...(mapping?.simple ? mapping?.simple : [])],
    plural: ["$ngettext", ...(mapping?.plural ? mapping?.plural : [])],
    ctxPlural: ["$npgettext", ...(mapping?.ctxPlural ? mapping?.ctxPlural : [])],
    ctx: ["$pgettext", ...(mapping?.ctx ? mapping?.ctx : [])],
  };

  const regex = new RegExp(
    `(?<method>${Object.values(methods)
      .map((m) => m.map((v) => escapeRegexValue(v)))
      .flat()
      .join("|")})${ws}\\(${ws}${params}`,
    "gm",
  );

  const res: MessageCtx[] = [];
  let match;
  while ((match = regex.exec(src)) !== null) {
    const g = match.groups;
    const params = g?.params;
    if (!params) {
      throw new Error("translation function has no parameters");
    }
    const lineNum = src.substring(0, match.index).split("\n").length;

    const args = parseQuotedStringParams(params);

    if (!args) {
      throw new Error("translation function has no message");
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
