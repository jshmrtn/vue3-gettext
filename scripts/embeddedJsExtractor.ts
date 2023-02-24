import { ChildNode, TextNode } from "parse5";
import { ScriptKind } from "typescript";
import { Element, IHtmlExtractorFunction } from "gettext-extractor/dist/html/parser.js";
import { ElementSelectorSet } from "gettext-extractor/dist/html/selector.js";
import { JsParser } from "gettext-extractor/dist/js/parser.js";
import { IContentOptions, normalizeContent } from "gettext-extractor/dist/utils/content.js";
import { Validate } from "gettext-extractor/dist/utils/validate.js";
import { Node, serialize } from "parse5";
import treeAdapter from "parse5-htmlparser2-tree-adapter";
import * as typescript from "typescript";

type Template = Element & {
  tagName: "template";
  content: { nodeName: string; childNodes: ChildNode[] };
};

export function embeddedJsExtractor(selector: string, jsParser: JsParser): IHtmlExtractorFunction {
  Validate.required.nonEmptyString({ selector });
  Validate.required.argument({ jsParser });

  const selectors = new ElementSelectorSet(selector);

  return (node: any, fileName: string, _, lineNumberStart: number) => {
    if (typeof (node as Element).tagName !== "string") {
      return;
    }

    const element = node as Element | Template;

    if (selectors.anyMatch(element)) {
      const children = element.nodeName === "template" ? (element as Template).content.childNodes : element.childNodes;

      children.forEach((childNode) => {
        if (childNode.nodeName === "#text") {
          const currentNode = childNode as TextNode;

          jsParser.parseString(currentNode.value, fileName, {
            scriptKind: ScriptKind.Deferred,
            lineNumberStart: currentNode.sourceCodeLocation?.startLine
              ? currentNode.sourceCodeLocation?.startLine + lineNumberStart - 1
              : lineNumberStart,
          });
        }
      });
    }
  };
}
