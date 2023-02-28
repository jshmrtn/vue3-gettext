import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser.js";
import { ElementSelectorSet } from "gettext-extractor/dist/html/selector.js";
import { JsParser } from "gettext-extractor/dist/js/parser.js";
import { JsExtractors } from "gettext-extractor";
import { IContentOptions, normalizeContent } from "gettext-extractor/dist/utils/content.js";
import { Validate } from "gettext-extractor/dist/utils/validate.js";
import { DefaultTreeChildNode, Node, serialize } from "parse5";
import treeAdapter from "parse5-htmlparser2-tree-adapter";
import typescript from "typescript";
const { ScriptKind } = typescript;

type Template = Element & {
  tagName: "template";
  content: { nodeName: string; childNodes: DefaultTreeChildNode[] };
};

const getElementContent = (element: Element | Template, options: IContentOptions): string => {
  let content = serialize(element, {});

  // text nodes within template tags don't get serialized properly, this is a hack
  if (element.tagName === "template") {
    const docFragment = treeAdapter.createDocumentFragment();
    (element as Template).content.childNodes.forEach((childNode: Node) => {
      treeAdapter.appendChild(docFragment, childNode);
    });
    content = serialize(docFragment, {});
  }

  // Un-escape characters that get escaped by parse5
  content = content.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

  return normalizeContent(content, options);
};

export function embeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  const selectors = new ElementSelectorSet(selector);

  return (node: any, fileName: string) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    const element = node as Element;

    if (selectors.anyMatch(element)) {
      const source = getElementContent(element, {
        trimWhiteSpace: false,
        preserveIndentation: true,
        replaceNewLines: false,
      });

      jsParser.parseString(source, fileName, {
        scriptKind: ScriptKind.Deferred,
        lineNumberStart: (element.sourceCodeLocation && element.sourceCodeLocation.startLine) || 0,
      });
    }
  };
}
